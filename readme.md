# Library Management API

This is a simple project for manage a library system using  **Express**, **TypeScript** and **MongoDB**.  
It can create books, update them, borrow book, and also show borrow summary.  
Filtering, sorting, error handle also included.

---

##  Project Setup

1. First do `npm init` and install all needed packages like:

2. Also install TypeScript and type support:

3. Configure `tsconfig.json` for compile TypeScript to JavaScript.

4. Folder setup done by dividing code into:


---

##  Features

###  Book Management

- Add new book with title, author, genre, isbn, copies etc.
- Get all books or one book by id.
- Update or delete any book.

---

###  Filtering, Sorting, Limiting

- You can **filter** books by genre.
- You can **sort** by any field like `createdAt` in `asc` or `desc` order.
- You can **limit** how many book will show using `limit` query.

Example:


---

###  Borrow Book

- Check if book available or not.
- Deduct borrow quantity from total copies.
- If no copy left, set `available: false`.
- Save borrow info with quantity and due date.

---

###  Borrow Summary (Aggregation)

- Group borrow data by book.
- Sum how many times book borrowed.
- Show book title and isbn with total borrowed count.
- Done using MongoDB aggregation with:



---

### Error Handling

- If any error happen, response will be in same format.
- Always show:


- Also include validation error like when `copies` is negative.

---

## API Endpoints

| Method | Route             | Description                          |
|--------|------------------|--------------------------------------|
| GET    | `/api/`          | Show welcome message                 |
| POST   | `/api/books`     | Create a new book                    |
| GET    | `/api/books`     | Get all books (with filter & sort)   |
| GET    | `/api/books/:id` | Get single book                      |
| PATCH  | `/api/books/:id` | Update a book                        |
| DELETE | `/api/books/:id` | Delete a book                        |
| POST   | `/api/borrow`    | Borrow a book                        |
| GET    | `/api/borrow`    | Get summary of borrowed books        |

---

## Technologies Used

- Express.js  
- TypeScript  
- MongoDB  
- Mongoose  
- Postman (for test)









