import express from "express";
import handlebars from 'express-handlebars';
import { createServer } from 'http';
import { Server } from "socket.io";
import __dirname from "./utils.js";
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import viewsRouter from "./routes/views.js";

const app = express()
const PORT = process.env.PORT || 8080 
const httpServer = app.listen(PORT,()=>console.log(`Listening in ${PORT}`))

const io = new Server(httpServer)
io.on('conection',(socketClient)=>{
    console.log(`Conectado, id:${socketClient.id}`)
})



app.use(express.json())
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars') 

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)
