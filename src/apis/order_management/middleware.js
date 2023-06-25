
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


