const express = require("express")
const router = express.Router()
const fs = require('fs')

let products = []

router.get("/api/products", (req,res) => {
    let limit = parseInt(req.query.limit)
    let currentProducts = []
    const data = fs.readFileSync('products.json', "utf-8")
    if(data){
        currentProducts = JSON.parse(data)
    }
    let limitedProducts = [...currentProducts]

    if(!isNaN(limit) && limit > 0){
        limitedProducts = limitedProducts.slice(0, limit)
    }
    res.json(limitedProducts)
})

router.get("/api/products/:pid", (req,res) => {
    const pid = parseInt(req.params.pid)
    let currentProducts = []
    const data = fs.readFileSync('products.json', "utf-8")
    if(data){
        currentProducts = JSON.parse(data)
    }
    const product = currentProducts.find((prod) => prod.id === pid)
    if(!product) return res.status(404).json({msg: "ID invalido."})
    
    res.json( product )
})

router.post("/api/products", (req,res) => {
    let newProduct = req.body
    let {title, description, code, price, status, stock, category } = newProduct

    if(!status){
        status = true
    }

    if(title && description && code && price && stock && category){  //validacion de campos obligatorios
        try {

            let currentProducts = []
            const data = fs.readFileSync('products.json', "utf-8")

            if(data){
                currentProducts = JSON.parse(data)
            }

            const idMax = currentProducts.reduce((max, product) => {
                return product.id > max ? product.id : max
            }, currentProducts.length > 0 ? currentProducts[0].id : 0 )

            newProduct = {
                id: idMax + 1,
                ...newProduct
            }
            currentProducts.push(newProduct)
            fs.writeFileSync('products.json', JSON.stringify(currentProducts, null, 2))

        }catch{
            res.status(404).json({msg: "error al escribir el archivo"})
        }
        res.json({msg: "Producto agregado"})
    }else{
        res.status(404).json({msg: "Los campos title, description, code, price, ststus, stock y category son obligatorios"})
    }
})

router.put("/api/products/:pid", (req,res) => {
    const pid = parseInt(req.params.pid)

    let currentProducts = []
    const data = fs.readFileSync('products.json', "utf-8")
    if(data){
        currentProducts = JSON.parse(data)
    }

    const product = currentProducts.find((prod) => prod.id === pid)

    if(product){
        const {title, description, code, price, status, stock, category, thumbnails} = req.body

        if(title) product.title = title
        if(description) product.description = description
        if(code) product.code = code
        if(price) product.price = price
        if(product) product.status = status
        if(stock) product.stock = stock
        if(category) product.category = category
        if(thumbnails) product.thumbnails = thumbnails

        fs.writeFileSync('products.json', JSON.stringify(currentProducts, null, 2))
        res.json({ msg: "Producto actualizado", product });
    }else{
        res.status(404).json({msg: "Producto no encontrado"})
    }
})

router.delete("/api/products/:pid", (req,res) => {
    const pid = parseInt(req.params.pid)

    let currentProducts = []
    const data = fs.readFileSync('products.json', "utf-8")
    if(data){
        currentProducts = JSON.parse(data)
    }

    currentProducts = currentProducts.filter((prod) => prod.id !== pid)
    fs.writeFileSync('products.json', JSON.stringify(currentProducts, null, 2))
    res.json(`producto id:${pid} fue eliminado con exito`)
    
})


module.exports = router
