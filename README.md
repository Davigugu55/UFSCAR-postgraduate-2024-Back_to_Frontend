# UFSCAR Postgraduate 2024 - Back to Frontend

This repository contains both the backend and frontend components for a full-stack product CRUD application, developed as part of postgraduate studies in Web Development at UFSCAR.

## 🛠 Technologies Used

-   **Backend**: Node.js, Fastify, TypeScript, Knex.js, PostgreSQL (via Docker), Docker Compose
-   **Frontend**: React, React Router, React Bootstrap, Axios, Vite

## 📦 Project Structure

```
├── backend/   # Fastify API with PostgreSQL
└── frontend/  # React + Vite product listing interface
```

## 🚀 Backend Overview

-   **CRUD API** for products, persisted in PostgreSQL
-   **Knex.js** for migrations and queries
-   **Docker Compose** for database setup
-   **Endpoints:**
    -   `GET /products` – Retrieve all products
    -   `GET /products/:id` – Retrieve a product by ID
    -   `POST /products` – Create a new product (`name`, `price`, `description`, `category`, `image_url`)
    -   `PUT /products/:id` – Update a product
    -   `DELETE /products/:id` – Delete a product

### Database Table Example

| id  | name | price | description | category | image_url |
| --- | ---- | ----- | ----------- | -------- | --------- |

### Backend Setup

1. Navigate to `backend`:
    ```bash
    cd backend
    ```
2. Install FNM and Node.js (if not installed):
    ```bash
    sudo apt update
    sudo apt install unzip
    curl -fsSL https://fnm.vercel.app/install | bash
    fnm install 24
    node -v
    ```
3. Install Yarn Berry:
    ```bash
    corepack enable
    yarn set version stable
    ```
4. Run the database and install dependencies:
    ```bash
    docker-compose up -d
    yarn install
    yarn migrate
    yarn seed
    yarn dev
    ```
5. Open `test-api.html` in your browser to test the API.

See [`backend/README.md`](backend/README.md) for more details.

## 🚀 Frontend Overview

-   **React** SPA for product listing and interaction
-   **ProductList**: Fetches and displays all products, with filtering
-   **ProductCard**: Shows product details and action buttons
-   **CustomNavbar**: Main navigation bar
-   **Pages:**
    -   `/` (Home): Product list
    -   `/about`: About page

### Frontend Setup

1. Navigate to `frontend`:
    ```bash
    cd frontend
    ```
2. Install Node.js (if not installed) and Yarn Berry:
    ```bash
    corepack enable
    yarn set version stable
    ```
3. Install dependencies and start the dev server:
    ```bash
    yarn install
    yarn dev
    ```
4. Open your browser at the provided Vite URL (usually `http://localhost:5173`).

See [`frontend/README.md`](frontend/README.md) for more details.

## 🧹 Code Formatting & EditorConfig

To ensure consistent code style across the project, use **Prettier** and **.editorconfig**. This is highly recommended for all contributors.

### .editorconfig

The project includes a `.editorconfig` file to help maintain consistent editor settings (indentation, line endings, etc.).

**In VS Code:**

1. Install the [EditorConfig for VS Code extension](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).
2. The extension will automatically apply the settings from `.editorconfig` when you save files.

---

For any questions, please refer to the individual `README.md` files in each subproject.
