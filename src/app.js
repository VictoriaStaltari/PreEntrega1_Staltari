import express from "express";
import productsRouter from './products.js';
import cartsRouter from './carts.js';

const app = express()
const PORT = process.env.PORT || 8080 

app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT,()=>console.log(`Listening in ${PORT}`))