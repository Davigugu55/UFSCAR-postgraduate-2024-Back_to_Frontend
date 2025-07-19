# Backend Postgraduate Activities - Product CRUD API with Database

This project is part of my postgraduate studies in Web Development. The main objective is to create a robust backend API using **Fastify**, allowing full CRUD operations (**Create, Read, Update, Delete**) for product data, now persisted in a **PostgreSQL database** using **Knex.js**.

## 🛠 Technologies Used

- **Node.js + Fastify**: Fast and minimalist backend framework.
- **TypeScript**: Type safety and better code maintainability.
- **Knex.js**: SQL query builder for Node.js.
- **PostgreSQL (via Docker)**: Relational database for data persistence.
- **Docker + Docker Compose**: For database containerization and environment setup.

## 🚀 What Was Implemented

- Migration from a JSON-based storage system to a PostgreSQL relational database.
- Implementation of CRUD operations for the `products` table.
- Use of **Knex.js migrations** to handle database schema creation.
- Full integration of Fastify routes with PostgreSQL using Knex.js.

## 📦 API Features

### ✅ Endpoints

- **GET /products**  
  ➝ Retrieve all products.

- **GET /products/:id**  
  ➝ Retrieve a product by its `id`.

- **POST /products**  
  ➝ Create a new product with the fields:  
  `name`, `price`, `description`, `category`, `image_url`.

- **PUT /products/:id**  
  ➝ Update an existing product.

- **DELETE /products/:id**  
  ➝ Delete a product by `id`.

## 🧠 Database

- PostgreSQL database managed via Docker Compose.
- Migrations handled by Knex.js to create the `products` table.
- Example table structure:

| id  | name  | price | description | category | image_url |
|-----|-------|-------|-------------|----------|------------|

## 🧪 Testing

To test the API endpoints, you can use the provided `test-api.html` file. This file contains a simple interface to interact with all Create, Update and Delete operations.

### How to Use the Test Interface

1. Open `test-api.html` in your web browser
2. The interface provides buttons for each CRUD operation:
   - Create New Product
   - Delete Product
   - Update Product
   - Update Product image

## 🚀 Project Setup

1. Clone the repository
2. Install FNM and Node (If not installed)
```bash
# Installing unzip
sudo apt update
sudo apt install unzip

# Installing fnm
curl -fsSL https://fnm.vercel.app/install | bash

# Installing Node using fnm
fnm install 24
node -v
```
2. Install [Yarn Berry](https://github.com/yarnpkg/berry):
```bash
# Enable corepack
corepack enable

# Set Yarn version to stable in your project
yarn set version stable
```
3. Run:
```bash
# Run postgreSQL database in Docker Container
docker-compose up -d

# Install dependencies
yarn install

# Run latest migrations
yarn migrate

# Run seeds
yarn seed

# Start the Fastify server
yarn dev

# Open test webpage test-api.html
```