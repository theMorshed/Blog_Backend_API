# Blog Backend API Application

This is a simple application for managing a blog. It includes functionalities for managing user and blog. The application uses **MongoDB**, **Express**, **Node.js**, and **TypeScript** to provide a complete solution for managing user and blog.

## Features

-   **Blog Management:**

    -   Create, read, update, and delete blogs.
    -   Search for blogs by title and content.
    -   Display all blogs with searching, sorting, filtering

-   **User Management:**

    -   User can register for write blog.
    -   User can login for create, update, delete their own blog.

-   **Admin Activity:**

    -   Admin can block a user.
    -   Admin can delete a user.
    -   Admin can delete a blog.

## Technologies Used

-   **Node.js** – JavaScript runtime built on Chrome's V8 JavaScript engine.
-   **Express** – Web application framework for Node.js.
-   **MongoDB** – NoSQL database used to store products and orders.
-   **Mongoose** – ODM (Object Document Mapper) for MongoDB.
-   **TypeScript** – A superset of JavaScript that adds static types.
-   **Dotenv** – A module for loading environment variables from a `.env` file.
-   **CORS** – Middleware for enabling Cross-Origin Resource Sharing.

## Requirements

Before running the project locally, make sure you have the following installed:

-   **Node.js** – Version 16.x or higher
-   **MongoDB** – Local or cloud instance (e.g., MongoDB Atlas)

## Setting Up the Project Locally

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/theMorshed/Blog_Backend_API.git
```

### 2. Install Dependencies

Navigate to the project directory and install all required dependencies:

```bash
cd Blog_Backend_API
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory of the project, and set the following environment variables:

```bash
PORT=5000
DATABASE_URL=mongodb://localhost:27017/bikestore(you will get this api from mongodb atlas)
```

-   **PORT:** – The port on which the server will run.
-   **DATABASE_URL:** – Your MongoDB connection URL (can be a local MongoDB instance or a MongoDB Atlas connection string).

### 4. Run the Application

Start the development server by running the following command:

```bash
npm run start:dev
```

This will start the server on the port specified in your .env file (default: 5000).

### 5. Access the Application

Once the server is running, you can access the application API at:

```bash
http://localhost:5000
```

# API Documentation

## API Endpoints

### 1. Authentication

#### 1.1 Register User
**POST** `/api/auth/register`

**Description**: Registers a new user with the platform. It validates user data and saves it to the database.

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
