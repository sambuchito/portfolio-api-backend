→ **Proyecto: Portfolio API Backend**

Este proyecto es una API RESTful desarrollada con Node.js, Express y MongoDB.
Forma parte del backend de un portfolio web personal y tiene como objetivo manejar usuarios, autenticación y un sistema de comentarios con respuestas.

---

→ **Tecnologías utilizadas:**

• Node.js – entorno de ejecución de JavaScript

• Express.js – framework web para Node

• MongoDB + Mongoose – base de datos NoSQL y ODM

• JWT (jsonwebtoken) – autenticación segura mediante tokens

• bcryptjs – encriptación de contraseñas

• dotenv – manejo de variables de entorno

• nodemon – recarga automática en desarrollo

---

→ **Estructura del proyecto:**

		📂 portfolio_api
 		┣ 📂 controllers
 		┃ ┣ authController.js
 		┃ ┣ commentController.js
 		┃ ┗ responseController.js
 		┣ 📂 middlewares
 		┃ ┗ authMiddleware.js
 		┣ 📂 models
 		┃ ┣ user.model.js
 		┃ ┣ Comment.js
 		┃ ┗ Response.js
 		┣ 📂 routes
 		┃ ┣ auth.routes.js
 		┃ ┣ commentRoutes.js
 		┃ ┗ responseRoutes.js
 		┣ 📄 .env
 		┣ 📄 .gitignore
 		┣ 📄 package.json
 		┗ 📄 server.js

---
→ **Instalación y configuración**

1. Clonar el repositorio

		git clone https://github.com/tu-usuario/portfolio-api-backend.git
		cd portfolio-api-backend


2. Instalar dependencias

		npm install


3. Configurar el archivo .env
		Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

		PORT=4000
		MONGO_URI=mongodb://127.0.0.1:27017/portfolio_api
		JWT_SECRET=una_clave_super_secreta


4. Ejecutar el servidor
		npm run dev
		El servidor se iniciará en:
		→ http://localhost:4000

---

→ **Ejemplo de flujo de uso (Postman)**

1. Registrar usuario → POST /api/auth/register

2. Loguearse → POST /api/auth/login

3. Copiar el token recibido

4. Crear un comentario → POST /api/comments (Header con token)

5. Crear una respuesta → POST /api/responses (Header con token)

---

**Autor**

Nombre: Luciana Rossi

Proyecto: API Backend para FullStack BIOS 2025

Versión: 1.0.0

Licencia: MINE
