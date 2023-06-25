import express from 'express';
import {create_order_middleware} from './middleware.js'
import {create_order,get_order_by_id,update_order,delete_order_by_id,get_orders} from './controller.js'

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
 *     description: Updates order with specified order_id from the database
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
router.patch('/:id',update_order)

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
router.get('/:pagenumber/:pagesize',get_orders)

export default router;