import express from "express"
import handlebars from "express-handlebars"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import __dirname from './utils.js'
import {Server} from "socket.io"
import fs from 'fs'


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", productsRouter)
app.use("/", cartRouter)
app.use("/", viewsRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

const httpServer = app.listen(8080, () => console.log(`Server running on port ${PORT}`))
const socketServer = new Server(httpServer)

socketServer.on('connection', socketServer => {
    console.log("Nuevo cliente conectado")
    
    socketServer.on('newProduct', producto => {
        try {
            let currentProducts = [];
            const data = fs.readFileSync('products.json', "utf-8")

            if (data) {
                currentProducts = JSON.parse(data);
            }

            const idMax = currentProducts.reduce((max, product) => {
                return product.id > max ? product.id : max;
            }, currentProducts.length > 0 ? currentProducts[0].id : 0)

            const nuevoProducto = {
                id: idMax + 1,
                ...producto
            };

            currentProducts.push(nuevoProducto);
            fs.writeFileSync('products.json', JSON.stringify(currentProducts, null, 2))
            socketServer.emit('products', currentProducts)
        } catch (error) {
            console.error('Error al manejar el producto: ', error)
        }
    })
    socketServer.emit('products', JSON.parse(fs.readFileSync('products.json', "utf-8")))
})