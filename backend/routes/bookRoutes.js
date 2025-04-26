import express from "express"
import Book from "../model/book.js";

const router = express.Router();

// GET /book/getbooks
router.get('/getbooks', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch books", error: err.message });
    }
});


router.post('/add', async (req, res) => {
    try {
        const { title, author,genre, description ,coverImage} = req.body;

        if (!title || !author || !genre || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBook = new Book({ title, author,genre, description,coverImage });
        await newBook.save();

        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (err) {
        res.status(500).json({ message: "Failed to add book", error: err.message });
    }
})

router.get('/getbook/:bookname', async (req, res) => {
    const { bookname } = req.params;
    console.log(bookname)
    try {
        const book = await Book.findOne({ title: { $regex: new RegExp(bookname, 'i') } });
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json({ book });
    } catch (err) {
        console.error("Error fetching book:", err); // 👈 Add this line
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});


export default router