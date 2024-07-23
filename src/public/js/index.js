const socket = io()


document.getElementById('product-form').addEventListener('submit', event =>{
    event.preventDefault()

    const producto = document.getElementById('producto').value 
    const precio = parseInt(document.getElementById('precio').value)
    const stock = parseInt(document.getElementById('stock').value)

    const nuevoProducto = {
        title: producto,
        price: precio,
        stock: stock
    } 
    
    socket.emit("newProduct", nuevoProducto)
    document.getElementById('product-form').reset()
} )

socket.on('products', data => {
    const productsList = document.querySelector('.products_list table')
    let newTable = `
        <tr class="columnas">
            <th>Producto</th>
            <th>Precio</th>
            <th>Stock</th>
        </tr>
    `
    data.forEach(product => {
        newTable += `
            <tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
            </tr>
        `
    })
    productsList.innerHTML = newTable;
})