const express = require('express')
const { pool, initDatabase } = require('./db')

initDatabase()
const app = express()

app.use(express.json())

// Create a new book
app.post('/books', async (req, res) => {
  const book = req.body
  await pool.execute('INSERT INTO books (title) VALUES (?)', [book.title])
  res.status(201).json(book)
})

// Get all books
app.get('/books', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM books')
  rows.length > 0 ? res.json(rows) : res.status(404).json({ message: 'No books found' })
})

// Get a single book
app.get('/books/:id', async (req, res) => {
  const { id } = req.params
  const [rows] = await pool.query('SELECT * FROM books WHERE id = (?)', [id])
  rows.length > 0 ? res.json(rows[0]) : res.status(404).json({ message: 'Book not found' })
})

// Update a book
app.put('/books/:id', async (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const [rows] = await pool.execute('UPDATE books SET title = (?) WHERE id = (?)', [title, id])
  rows.affectedRows > 0 ? res.status(200).json({ message: 'Book updated' }) : res.status(404).json({ message: 'Book not found' })
})

// Delete a book
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params
  const [rows] = await pool.execute('DELETE FROM books WHERE id = (?)', [id])
  rows.affectedRows > 0 ? res.status(200).json({ message: 'Book deleted' }) : res.status(404).json({ message: 'Book not found' })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})