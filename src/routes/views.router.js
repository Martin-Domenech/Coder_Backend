import { Router } from "express"
const router = Router()
import { readFileSync, writeFileSync } from 'fs'

router.get('/', (req,res) => {
    let currentProducts = []
    try {
        const data = readFileSync('products.json', "utf-8")
        if (data) {
            currentProducts = JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading products.json:', error)
        return res.status(500).send('Internal Server Error')
    }
    res.render('home', { products: currentProducts })
})

router.get('/realtimeproducts', (req,res) => {
    let currentProducts = []
    try {
        const data = readFileSync('products.json', "utf-8")
        if (data) {
            currentProducts = JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading products.json:', error)
        return res.status(500).send('Internal Server Error')
    }
    res.render('realTimeProducts', { products: currentProducts })
})

export default router