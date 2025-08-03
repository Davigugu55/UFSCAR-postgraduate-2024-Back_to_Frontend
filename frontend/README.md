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

3. Install dependencies and start the dev server:

```bash
# Install dependencies
yarn install

# Start the VITE server
yarn dev
```

4. Open your browser at the provided Vite URL (usually `http://localhost:5173`).
