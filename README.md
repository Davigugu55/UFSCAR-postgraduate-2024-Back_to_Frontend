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

## 🐳 Docker Compose Setup

```bash
docker-compose up -d

# Install dependencies
npm install

# Run migrations
npx knex migrate:latest

# Run seed
npx knex seed:run --knexfile knexfile.js

# Start the Fastify server
npm run dev