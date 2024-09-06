import { Router } from 'express';
import fs from 'fs';

const router = Router() 
const path = './data/carts.json' 

const readCarts = () => {
    const data = fs.readFileSync(path) 
    return JSON.parse(data) 
} 

const writeCarts = (carts) => {
    fs.writeFileSync(path, JSON.stringify(carts, null, 2)) 
} 

router.post('/', (req, res) => {
    const carts = readCarts() 
    const newCart = {
        id: carts.length ? carts[carts.length - 1].id + 1 : 1,
        products: []
    } 
    carts.push(newCart) 
    writeCarts(carts) 
    res.status(201).json(newCart) 
}) 

router.get('/:cid', (req, res) => {
    const carts = readCarts() 
    const cart = carts.find(c => c.id == req.params.cid) 
    if (cart) {
        res.json(cart.products) 
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' }) 
    }
}) 

router.post('/:cid/product/:pid', (req, res) => {
    const carts = readCarts() 
    const cart = carts.find(c => c.id == req.params.cid) 
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' }) 

    const productIndex = cart.products.findIndex(p => p.product == req.params.pid) 
    if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1 
    } else {
        cart.products.push({ product: req.params.pid, quantity: 1 }) 
    }
    writeCarts(carts) 
    res.json(cart) 
}) 

export default router;
