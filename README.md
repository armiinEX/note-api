# 📝 Note API

A simple RESTful API for a note-taking application built with **Express.js**, **TypeScript**, **Sequelize**, and **PostgreSQL**.

---

## 📦 Tech Stack

- Node.js
- Express.js
- TypeScript
- Sequelize ORM
- PostgreSQL
- dotenv

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/armiinEX/note-api
cd note-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root with the following content:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=notes_db
DB_USER=postgres
DB_PASSWORD=yourpassword 
PORT=3000
```

Make sure your PostgreSQL server is running and you’ve created the database (`notes_db`).

### 4. Run the app

#### In development:
```bash
npm run dev
```

#### Build and run:
```bash
npm run build
npm start
```

---

## 🗂 API Endpoints

Base URL: `http://localhost:3000/notes`

| Method | Endpoint      | Description             |
|--------|---------------|-------------------------|
| GET    | `/`           | Get all notes (paginated) |
| GET    | `/:id`        | Get note by ID          |
| POST   | `/`           | Create a new note       |
| PUT    | `/:id`        | Update a note by ID     |
| DELETE | `/:id`        | Delete a note by ID     |

### Example: Create a note

**POST** `/notes`

```json
{
  "title": "My First Note",
  "content": "This is the content of my note."
}
```

### Example: Paginated fetch

**GET** `/notes?page=1&limit=3`

---

## ✅ Validation

- `title` and `content` are required for creating and updating notes.
- 404 response for invalid note IDs.
- Pagination query parameters: `page`, `limit`.

---

## 📁 Project Structure

```
src/
 ┣ config/         # Database configuration
 ┣ controllers/    # Request handlers
 ┣ models/         # Sequelize models
 ┣ routes/         # Route definitions
 ┣ services/       # Business logic
 ┗ index.ts        # Entry point
```

---

## 📬 Postman Collection

A Postman collection is provided in `Note API.postman_collection.json` (you can export it manually for testing).

---


## 🧑‍💻 Author

- **Armin** – [armiinEX](https://github.com/armiinEX/)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
