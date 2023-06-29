import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'
import {getenv} from '../../core/helper.js'
import { error } from 'console'
const prisma = new PrismaClient({
    datasources:{
        db:{
            url: getenv("DATABASE_URL")
        }
    }
})

//function creates order 
export const create_order=async (req, res)=>{
    try{
        const { name, description } = req.body;
        const newOrder= await prisma.order.create({
            data:{
                order_id: crypto.randomUUID(),
                name: name,
                description: description
            },
        })

    return res.status(200).json({ status: "success", message: "Order Created", order:newOrder }) 
    }
    catch(err){
        return res.status(400).json({status: "failed", message: "An Error Occured!",error:err.message });
    }
    finally{
        await prisma.$disconnect();
    }
}

//function returns order by order_id
export const get_order_by_id=async (req, res)=>{
    try{
        const id=req.params.id
        const order= await prisma.order.findUnique({
            where:{
            order_id:id
            },
            include: {
                items: true
            },
        })

    return res.status(200).json({ status: "success", message: "Order Fetched", order:order }) 
    }
    catch(err){
        return res.status(400).json({status: "failed", message: "An Error Occured!",error:err.message });
    }
    finally{
        await prisma.$disconnect();
    }
}

//function updates an order in the database
export const update_order=async (req, res)=>{
    try{
        const id=req.params.id
        const {...updatedData}=req.body 
        const updatedOrder= await prisma.order.update({
            where:{
            order_id:id
            },
            data:updatedData
        })

    return res.status(200).json({ status: "success", message: "Order Updated", order:updatedOrder }) 
    }
    catch(err){
        return res.status(400).json({status: "failed", message: "An Error Occured!",error:err.message });
    }
    finally{
        await prisma.$disconnect();
    }
}

//function deletes order by order_id
export const delete_order_by_id=async (req, res)=>{
    try{
        const id=req.params.id
        const order= await prisma.order.delete({
            where:{
            order_id:id
            }
        })

    return res.status(200).json({ status: "success", message: "Order Deleted" }) 
    }
    catch(err){
        return res.status(400).json({status: "failed", message: "An Error Occured!",error:err.message });
    }
    finally{
        await prisma.$disconnect();
    }
}

//function returns all orders (paginated)
export const get_orders= async (req, res)=>{
    try{
        const pageNumber=parseInt(req.params.pagenumber)
        const pageSize=parseInt(req.params.pagesize)
        const skip = (pageNumber - 1) * pageSize;

        const orders = await prisma.order.findMany({
            include: {
                items: true
            },
            skip,
            take: pageSize,
            });

    return res.status(200).json({ status: "success", message: "Orders Fetched",pageNumber:pageNumber,pageSize:pageSize,orders:orders }) 
    }
    catch(err){
        return res.status(400).json({status: "failed", message: "An Error Occured!",error:err.message });
    }
    finally{
        await prisma.$disconnect();
    }
}


//function returns all orders (paginated)
export const get_orders_by_status= async (req, res)=>{
    try{
        const status=req.params.status
        const pageNumber=parseInt(req.params.pagenumber)
        const pageSize=parseInt(req.params.pagesize)
        const skip = (pageNumber - 1) * pageSize;

        const orders = await prisma.order.findMany({
            where:{
                status:status
            },
            include: {
                items: true
            },
            skip,
            take: pageSize,
            });

    return res.status(200).json({ status: "success", message: "Orders Fetched",pageNumber:pageNumber,pageSize:pageSize,orders:orders }) 
    }
    catch(err){
        return res.status(400).json({status: "failed", message: "An Error Occured!",error:err.message });
    }
    finally{
        await prisma.$disconnect();
    }
}

//function to add an item to an order
export const create_order_item=async (req, res)=>{
    try{
        const { order_id, name, price } = req.body;

        
        //check if order exists
        const order= await prisma.order.findUnique({
            where:{
            order_id:order_id
            }
        })

        if(!order){
            throw new Error(`Order Not Found`);
        }

        const newOrderItem= await prisma.Items.create({
            data:{
                order_id: order_id,
                name: name,
                price: price
            }
            
        })

    return res.status(200).json({ status: "success", message: "Order Item Created", item:newOrderItem }) 
    }
    catch(err){
        return res.status(400).json({status: "failed", message: "An Error Occured!",error:err.message });
    }
    finally{
        await prisma.$disconnect();
    }
}

