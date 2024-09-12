import express from "express";
import handlebars from 'express-handlebars';
import { createServer } from 'http';
import { Server } from "socket.io";
import __dirname from "./utils.js";
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.json())
app.use(express.static('public'));

app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const PORT = process.env.PORT || 8080 
app.listen(PORT,()=>console.log(`Listening in ${PORT}`))