# Basic Express, Mongoose, and MongoDB Server

This project sets up a basic Express server and connects to a MongoDB database using Mongoose.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Configure environment variables**:
    Create a `.env` file in the root directory and add your MongoDB connection URI and desired port:
    ```
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/mydatabase # Replace with your MongoDB URI
    ```
3.  **Start the server**:
    ```bash
    npm start
    ```

The server will run on the specified `PORT` (defaulting to 3000) and attempt to connect to the MongoDB instance at `MONGO_URI`. You can access the basic route at `http://localhost:3000/`.
