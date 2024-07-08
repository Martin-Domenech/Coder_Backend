# API de E-commerce

Esta es una API de ejemplo para un sistema de e-commerce que gestiona productos y carritos de compras. Utiliza Node.js y Express para el backend y Postman para realizar pruebas de las operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

## Requisitos

- Node.js instalado en tu máquina
- Postman (o cualquier otra herramienta similar) para probar las APIs

El servidor se iniciará en `http://localhost:8080`.

## Endpoints

### Productos

- **GET /api/products**: Obtener todos los productos.
- **GET /api/products/:pid**: Obtener un producto por ID.
- **POST /api/products**: Agregar un nuevo producto. En el cuerpo de la solicitud (body), se pueden usar los siguientes campos para generar productos aleatorios:

  ```json
  {
    "title": "{{$randomProduct}}",
    "description": "{{$randomLoremParagraph}}",
    "code": "{{$randomCurrencyCode}}",
    "price": {{$randomInt}},
    "status": {{$randomBoolean}},
    "stock": {{$randomInt}},
    "category": {{$randomColor}},
    "thumbnails": ["{{$randomCatsImage}}", "{{$randomCatsImage}}"]
  }
- **PUT /api/products/:pid**: Actualizar un producto existente.
- **DELETE /api/products/:pid**: Eliminar un producto por ID.

### Carritos

- **POST /api/cart**: Crear un nuevo carrito vacío.
- **GET /api/cart/:cid**: Obtener un carrito por ID.
- **POST /api/cart/:cid/product/:pid**: Agregar un producto a un carrito existente pasandole los IDs correspondientes.

## Persistencia de Datos

- La persistencia de los datos se maneja utilizando el sistema de archivos (file system). Los productos se guardan en un archivo products.json y los carritos en un arcivo carts.json.