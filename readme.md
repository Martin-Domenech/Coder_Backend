# API de E-commerce

Esta es una API de ejemplo para un sistema de e-commerce que gestiona productos. Utiliza Node.js, Express, websockets y handlebars como motor de plantillas. 

## Endpoints

El servidor se iniciará en `http://localhost:8080` donde se mostrara la lista de productos.
En el endpoint `http://localhost:8080/realtimeproducts` habra un formulario donde se pueden agregar productos y una lista que se actualiza en tiempo real.


## Descripción de Archivos

- `public/css/styles.css`: Contiene estilos CSS para la aplicación.
- `public/js/index.js`: Maneja la lógica del cliente, incluyendo la comunicación por WebSocket.
- `routes/products.router.js`: Maneja las rutas relacionadas con los productos.
- `routes/carts.router.js`: Maneja las rutas relacionadas con los carritos de compra.
- `routes/views.router.js`: Maneja las rutas relacionadas con las vistas.
- `views/layouts/main.handlebars`: Plantilla principal de Handlebars.
- `views/realTimeProducts.handlebars`: Vista que muestra y permite agregar productos en tiempo real.
- `views/home.handlebars`: Vista que muestra los productos.
- `app.js`: Configuración principal del servidor y la lógica de WebSocket.
- `utils.js`: Contiene utilidades compartidas.
- `products.json`: Archivo donde se almacenan los productos.

## Funcionalidades

- **Agregar Producto**: Permite agregar nuevos productos a la lista.
- **Visualización en Tiempo Real**: La lista de productos se actualiza en tiempo real cuando se agregan nuevos productos.

## Persistencia de Datos

- La persistencia de los datos se maneja utilizando el sistema de archivos (file system). Los productos se guardan en un archivo products.json y los carritos en un arcivo carts.json.