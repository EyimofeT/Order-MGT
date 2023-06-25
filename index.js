import express from "express";
import cors from "cors";
import {getenv} from './src/core/helper.js'
import orderRouter from "./src/apis/order_management/routes.js"
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Order Management',
      version: '1.0.0',
      description: 'API documentation for Order Management API',
    },
  },
  apis: ['./src/apis/order_management/routes.js'], // Specify the path to your API routes
};

// Initialize Swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

// Set up Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//For getting data from the frontend as json format 
app.use(express.json());

//trying to make api request from front end
app.use(cors({
    origin:'*',
    methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


// Logging middleware
app.use(morgan('combined'));

//all users routers
app.use(`${getenv("BASE_URL")}/order`,orderRouter)


// app.use(cookie());

const port = getenv("API_PORT") || 5000
app.listen(port,()=> console.log("SERVER LISTENING ON PORT: " + port));

