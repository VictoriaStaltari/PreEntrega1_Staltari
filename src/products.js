import { Router } from 'express';
import fs from 'fs';

const router = Router() 
const path = './data/products.json' 

const readProducts = () => {
    const data = fs.readFileSync(path) 
    return JSON.parse(data) 
} 

const writeProducts = (products) => {
    fs.writeFileSync(path, JSON.stringify(products, null, 2)) 
} 

router.get('/', (req, res) => {
    const products = readProducts() 
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length 
    res.json(products.slice(0, limit)) 
}) 

router.get('/:pid', (req, res) => {
    const products = readProducts() 
    const product = products.find(p => p.id == req.params.pid) 
    if (product) {
        res.json(product) 
    } else {
        res.status(404).json({ error: 'Producto no encontrado' }) 
    }
}) 

router.post('/', (req, res) => {
    const products = readProducts() 
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        ...req.body,
        status: req.body.status !== undefined ? req.body.status : true
    } 
    
    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' }) 
    }

    products.push(newProduct) 
    writeProducts(products) 
    res.status(201).json(newProduct) 
}) 

router.put('/:pid', (req, res) => {
    const products = readProducts() 
    const productIndex = products.findIndex(p => p.id == req.params.pid) 
    if (productIndex !== -1) {
        const updatedProduct = { ...products[productIndex], ...req.body } 
        if (req.body.id) {
            return res.status(400).json({ error: 'No se puede actualizar el id' }) 
        }
        products[productIndex] = updatedProduct 
        writeProducts(products) 
        res.json(updatedProduct) 
    } else {
        res.status(404).json({ error: 'Producto no encontrado' }) 
    }
}) 

router.delete('/:pid', (req, res) => {
    let products = readProducts() 
    const productIndex = products.findIndex(p => p.id == req.params.pid) 
    if (productIndex !== -1) {
        products = products.filter(p => p.id != req.params.pid) 
        writeProducts(products) 
        res.json({ message: 'Producto eliminado' }) 
    } else {
        res.status(404).json({ error: 'Producto no encontrado' }) 
    }
}) 

export default router;