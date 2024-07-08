const express = require("express")
const router = express.Router()
const fs = require("fs")
const { products } = require("./products.router")


router.post("/api/cart/", (req,res) => {
    let newCart = req.body
    let currentCarts = []
    const data = fs.readFileSync('carts.json', "utf-8")
    if(data){
        currentCarts = JSON.parse(data)
    }
    let cartId = currentCarts.length

    newCart = {
        id: cartId + 1,
        products: []
    }

    currentCarts.push(newCart)
    fs.writeFileSync('carts.json', JSON.stringify(currentCarts, null, 2))
    res.json({msg: "Carrito creado con exito"})
})

router.get("/api/cart/:cid", (req,res) => {
    const cid = parseInt(req.params.cid)
    let currentCarts = []
    const data = fs.readFileSync('carts.json', "utf-8")
    if(data){
        currentCarts = JSON.parse(data)
    }

    const cart = currentCarts.find(c => c.id === cid)
    if(!cart) return res.status(404).json({msg: "ID invalido."})
    res.json(cart)
})

router.post("/api/cart/:cid/product/:pid", (req,res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)

    let currentCarts = []
    const dataCart = fs.readFileSync('carts.json', "utf-8")
    if(dataCart){
        currentCarts = JSON.parse(dataCart)
    }

    let currentProducts = []
    const dataProd = fs.readFileSync('carts.json', "utf-8")
    if(dataProd){
        currentProducts = JSON.parse(dataProd)
    }

    const cart = currentCarts.find((c) => c.id === cid)
    const prod = currentProducts.find((p) => p.id === pid)

    if(!cart || !prod){
        res.status(404).json({msg: "Carrito o producto no encontrado"})
    }else{

        const cartProduct = cart.products.find((item) => item.product === pid) 

        if(!cartProduct){
            cart.products.push({product: pid, quantity: 1})
            res.json({msg: `Se agrego el producto ${pid} al carrito ${cid}`})

        }else{
            cartProduct.quantity++
            res.json({msg: `Se agrego el producto ${pid} al carrito ${cid}`})
        }
        fs.writeFileSync('carts.json', JSON.stringify(currentCarts, null, 2))
    }
})


module.exports = router 