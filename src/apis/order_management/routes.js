import express from 'express';
import {create_order_middleware,update_order_middleware,get_order_middleware,create_order_item_middleware} from './middleware.js'
import {create_order,get_order_by_id,update_order,delete_order_by_id,get_orders,get_orders_by_status,create_order_item} from './controller.js'

const router = express.Router();


// all routes in here are starting with /wallet

/**
 * @swagger
 * /api/v1/order:
 *   post:
 *     summary: Create Order
 *     description: Creates an order using the prisma modeal and saves to the database
 *     parameters:
 *      -   name: Order Information
 *          in: body
 *          description: Order Name and Description
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *         
 *             
 *      
 *     responses:
 *       400:
 *          description: An Error Occured
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''
 */
router.post('/',create_order_middleware,create_order)

/**
 * @swagger
 * /api/v1/order/{id} :
 *   get:
 *     summary: Get order by id
 *     description: Retrieves order with specified order_id from the database
 *     parameters:
 *      -   name: id
 *          in: path
 *          description: Order ID
 *     responses:
 *       400:
 *          description: An Error Occured
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''
 */
router.get('/:id',get_order_by_id)

/**
 * @swagger
 * /api/v1/order/{id} :
 *   patch:
 *     summary: Update order by id
 *     description: Updates order with specified order_id from the database, order status is updated using this endpoint
 *     parameters:
 *      -   name: id
 *          in: path
 *          description: Order id
 *      -   name: Order Information
 *          in: body
 *          description: Order Name and Description
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  status:
 *                      type: string
 *     responses:
 *       400:
 *          description: An Error Occured
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''
 */
router.patch('/:id',update_order_middleware,update_order)

/**
 * @swagger
 * /api/v1/order/{id} :
 *   delete:
 *     summary: Delete order by id
 *     description: Deletes order with specified order_id from the database
 *     parameters:
 *      -   name: id
 *          in: path
 *          description: Order ID
 *     responses:
 *       400:
 *          description: An Error Occured
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''
 */
router.delete('/:id',delete_order_by_id)

/**
 * @swagger
 * /api/v1/order/{pagenumber}/{pagesize} :
 *   get:
 *     summary: Get all orders
 *     description: Gets all orders from the database and performs pagination operations
 *     parameters:
 *      -   name: pagenumber
 *          in: path
 *          description: Page Number (Number of page to view)
 *      -   name: pagesize
 *          in: path
 *          description: Page Size (Number of orders to display per page)
 *     responses:
 *       400:
 *          description: An Error Occured
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''
 */
router.get('/:pagenumber/:pagesize',get_order_middleware,get_orders)

/**
 * @swagger
 * /api/v1/order/{status}/{pagenumber}/{pagesize} :
 *   get:
 *     summary: Get all orders using status
 *     description: Gets all orders using the status parameter from the database and performs pagination operations
 *     parameters:
 *      -   name: status
 *          in: path
 *          description: Status (pending, completed, cancelled)
 *      -   name: pagenumber
 *          in: path
 *          description: Page Number (Number of page to view)
 *      -   name: pagesize
 *          in: path
 *          description: Page Size (Number of orders to display per page)
 *     responses:
 *       400:
 *          description: An Error Occured
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''
 */
router.get('/:status/:pagenumber/:pagesize',get_order_middleware,get_orders_by_status)

/**
 * @swagger
 * /api/v1/order/create_order_item :
 *   post:
 *     summary: Create Order Item
 *     description: Creates Order item and attaches it to the order specified with the id
 *     parameters:
 *      -   name: Order Item Information
 *          in: body
 *          description: Order ID, name and price
 *          schema:
 *              type: object
 *              properties:
 *                  order_id:
 *                      type: string
 *                  name:
 *                      type: string
 *                  price:
 *                      type: integer
 *     responses:
 *       400:
 *          description: An Error Occured
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''
 */
router.post('/create_order_item',create_order_item_middleware,create_order_item)

export default router;