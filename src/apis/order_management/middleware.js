
export const create_order_middleware = async (req,res,next)=>{
  if (!req.body)
  return res
    .status(400)
    .json({ status: "failed", message: "cannot pass empty request" });

    const { name, description } = req.body;

if (!name) {
  return res
    .status(400)
    .json({ status: "failed", message: "name required" });
}
if (!description) {
  return res
    .status(400)
    .json({ status: "failed", message: "description required" });
}

next()
}

export const update_order_middleware = async (req,res,next)=>{
  if (!req.body)
  return res
    .status(400)
    .json({ status: "failed", message: "cannot pass empty request" });

  const expectedKeys = ["name", "description","status"]
  const bodyKeys= Object.keys(req.body)
  const extraKeys = bodyKeys.filter(key => !expectedKeys.includes(key))

  if (extraKeys.length === 0 && bodyKeys.length >= expectedKeys.length - 2) {
    if ("status" in req.body) {
      const { status } = req.body;

      if (
        status !== "cancelled" &&
        status !== "pending" &&
        status !== "completed"
      ) {
        return res
          .status(400)
          .json({ status: "failed", message: "Invalid Status Update" });
      }
    }
    next()
  }
  else{
    return res
    .status(400)
    .json({ status: "failed", message: "Invalid Update Parameters" });
  }

  
}


export const get_order_middleware = async (req,res,next)=>{
  if (!req.body)
  return res
    .status(400)
    .json({ status: "failed", message: "cannot pass empty request" });

    const { status,pagenumber, pagesize } = req.params;
    const pageNumber=parseInt(pagenumber)
    const pageSize=parseInt(pagesize)

    if (status) {
      if (
        status !== "cancelled" &&
        status !== "pending" &&
        status !== "completed"
      ) {
        return res
          .status(400)
          .json({ status: "failed", message: "Invalid Status Value" });
      }
    }
    
    if(pageNumber < 1 || isNaN(pageNumber) ){
      return res
          .status(400)
          .json({ status: "failed", message: "Invalid Page Number Value" });
    }
    if(pageSize < 1 || isNaN(pageSize)){
      return res
          .status(400)
          .json({ status: "failed", message: "Invalid Page Size Value" });
    }
      // console.log(req.params)
    next()
  }

  export const create_order_item_middleware = async (req, res , next) => {
    if (!req.body)
  return res
    .status(400)
    .json({ status: "failed", message: "cannot pass empty request" });

    // const { name, description } = req.body;
    const { order_id, name, price } = req.body;

    if(!order_id){
    return res
    .status(400)
    .json({ status: "failed", message: "order_id required" });
    }

    if(!name){
      return res
    .status(400)
    .json({ status: "failed", message: "name required" });

    }
    if(!price){
      return res
    .status(400)
    .json({ status: "failed", message: "price required" });
    }
    next()
  }
 



