# Project Management API

A simple backend service for managing projects, built with Node.js, Express, and MongoDB.

## Local Setup Instructions

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/avishekpadhi/project_registry
cd project_registry
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File

Create a file named `.env` in the root of the project and add the following content. This file is used to store sensitive information like database connection strings and port numbers.

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/project_management
```

- `PORT`: The port on which the server will run.
- `MONGO_URI`: The connection string for your MongoDB database.

### 4. Start the Server
```bash
npm run start
```

The server should now be running at `http://localhost:3000`.

## API Endpoints

Details of the available API endpoints are below.

### 1. Create a New Project

-   **Endpoint:** `POST /projects`
-   **Description:** Creates a new project.
-   **Request Body Example:**
    ```json
    {
        "name": "E-commerce Website",
        "clientName": "Global Retail Inc.",
        "startDate": "2026-03-01",
        "endDate": "2026-09-15"
    }
    ```
-   **Success Response Example:**
    ```json
    {
        "success": true,
        "data": {
            "status": "active",
            "deletedAt": null,
            "_id": "65d7c4a1b4e1f8d1f8d7b8c7",
            "name": "E-commerce Website",
            "clientName": "Global Retail Inc.",
            "startDate": "2026-03-01T00:00:00.000Z",
            "endDate": "2026-09-15T00:00:00.000Z",
            "createdAt": "2026-02-12T20:30:57.989Z",
            "updatedAt": "2026-02-12T20:30:57.989Z"
        }
    }
    ```

### 2. List All Projects

-   **Endpoint:** `GET /projects`
-   **Description:** Retrieves a list of all non-deleted projects.
-   **Optional Query Parameters:**
    -   `status`: Filter by project status (e.g., `?status=active`).
    -   `search`: Case-insensitive search on `name` and `clientName`.
    -   `sort`: Sort by `createdAt` or `startDate` (descending).
-   **Success Response Example:**
    ```json
    {
        "success": true,
        "count": 2,
        "data": [
            {
                "_id": "65d7c4a1b4e1f8d1f8d7b8c7",
                "name": "E-commerce Website",
                "clientName": "Global Retail Inc.",
                "status": "active"
            },
            {
                "_id": "65d7c4b3b4e1f8d1f8d7b8d0",
                "name": "Mobile App Development",
                "clientName": "Tech Solutions LLC",
                "status": "on_hold"
            }
        ]
    }
    ```

### 3. Get a Single Project

-   **Endpoint:** `GET /projects/:id`
-   **Description:** Retrieves a single project by its ID.
-   **Success Response Example:**
    ```json
    {
        "success": true,
        "data": {
            "_id": "65d7c4a1b4e1f8d1f8d7b8c7",
            "name": "E-commerce Website"
        }
    }
    ```
-   **Error Response (Not Found):**
    ```json
    {
        "success": false,
        "message": "Project not found with id of 65d7c4a1b4e1f8d1f8d7b8c0"
    }
    ```

### 4. Update Project Status

-   **Endpoint:** `PATCH /projects/:id/status`
-   **Description:** Updates the status of a specific project.
-   **Request Body Example:**
    ```json
    {
        "status": "completed"
    }
    ```
-   **Success Response Example:**
    ```json
    {
        "success": true,
        "message": "Project status updated successfully",
        "data": {
            "_id": "65d7c4a1b4e1f8d1f8d7b8c7",
            "status": "completed"
        }
    }
    ```

### 5. Delete a Project

-   **Endpoint:** `DELETE /projects/:id`
-   **Description:** Soft-deletes a project. The project data is not permanently removed.
-   **Success Response Example:**
    ```json
    {
        "success": true,
        "message": "Project deleted successfully"
    }
    ```

## Technology Choices

While both a database and an in-memory data store could be used, I preferred to use a database to ensure persistent storage, which allows better testing and data reliability during development.

I have experience with both MongoDB and PostgreSQL, but I chose MongoDB for this project because:

- I am more familiar with MongoDB’s workflow with Node.js, which allows faster development.
- The document-based structure of MongoDB fits the project model naturally (projects with optional fields like `endDate` and `deletedAt`).
- MongoDB simplifies soft deletes, filtering, and sorting without additional overhead.

For projects with stricter relational requirements or complex transactions, PostgreSQL would be a strong alternative, but for this assignment, MongoDB provides a flexible, reliable, and efficient solution.

## Demo and Testing

### Live Demo

For demonstration purposes, the application is hosted at:
[https://project-registry-6wuh.onrender.com/](https://project-registry-6wuh.onrender.com/)

### Postman Collection

You can test the API endpoints using the following Postman collection:
[https://abhishekpadhi65-450582.postman.co/workspace/Abhishek-Padhi's-Workspace~013a391a-bc8b-4c77-8a9d-202bcfa85051/collection/52292006-4cfd5737-6840-42cb-9827-f84aa9278c1f?action=share&creator=52292006](https://abhishekpadhi65-450582.postman.co/workspace/Abhishek-Padhi's-Workspace~013a391a-bc8b-4c77-8a9d-202bcfa85051/collection/52292006-4cfd5737-6840-42cb-9827-f84aa9278c1f?action=share&creator=52292006)

## AI Tools Used

The following AI tools were used in the development of this project:

- **ChatGPT**: Used for brainstorming ideas and looking up syntax.
- **Gemini CLI**: Used for generating the `README.md` file and assisting with bug resolution.
