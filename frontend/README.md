# Frontend Postgraduate Activities - Product Listing Interface

This project is the frontend component of my postgraduate studies in Web Development. The main objective is to create a modern and responsive user interface using **React**, allowing users to view and interact with product data served by the backend API.

## 🖼️ Preview

![Application Screenshot](https://i.imgur.com/kPxsslL.png)

## 🛠 Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For declarative routing in a React application.
- **React Bootstrap**: For integrating Bootstrap components into the React application.
- **Axios**: For making HTTP requests to the backend API.
- **Vite**: A modern frontend build tool that provides a faster and leaner development experience.

## 🚀 What Was Implemented

- A responsive product listing page that displays items from the backend.
- A reusable `ProductCard` component to display individual product details (image, name, category, and price).
- Client-side routing for navigating between the "Home" and "About" pages.
- A filtering feature to search for products by their ID.
- "Edit" and "Excluir" (Delete) buttons on each product card, ready for functionality to be added.

## 📦 Frontend Features

### ✅ Components

- **`ProductList`**: Fetches and displays the list of all products. Includes the filtering logic.
- **`ProductCard`**: Renders a single product with its information and action buttons.
- **`CustomNavbar`**: The main navigation bar for the application.

### ✅ Pages

- **`/` (Home)**: The main page that displays the product list.
- **`/about`**: A simple about page.

## 🚀 Project Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install [Node.js](https://nodejs.org/) if you haven't already. It's recommended to use a version manager like [fnm](https://github.com/Schniz/fnm).
3.  Install [Yarn Berry](https://yarnpkg.com/getting-started/install):
    ```bash
    # Enable corepack (comes with Node.js)
    corepack enable

    # Set Yarn version to stable in your project
    yarn set version stable
    ```
4.  Install the project dependencies:
    ```bash
    yarn install
    ```
5.  Start the development server:
    ```bash
    yarn dev
    ```
6.  Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).