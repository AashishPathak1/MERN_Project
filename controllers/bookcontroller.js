const Book = require("../models/Book"); // Import your Book model
const cloudinary = require("cloudinary").v2; // Import your Cloudinary model
async function addBook(req, res) {
  try {
    // console.log("Request body:", req.body); // Log the request body
    // const book = new Book(req.body); // Create a new book instance
    // await book.save(); // Save the book to the database
    // // res.status(201).json(book);
    // let books = await Book.find({});
    // res.render("booktable", { books: books }); // Respond with the created book and a 201 status
    let book = new Book(req.body);
    if (req.file) {
      cloudinary.config({
        cloud_name: "dmvkdb242",
        api_key: "946234975599653",
        api_secret: "15n-LJb-v7GgzpyH_ZYrSJ9Wcxg"
      });

      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result.secure_url, "uploaded.secure_url");
      book.bookImage = result.secure_url;
    }

    // console.log("Request body:", req.body); // Log the request body
    // console.log(req.file, "req.file");
    await book.save();
    let books = await Book.find({});
    res.render("booktable", { books: books }); 
    // Respond with the created book and a 201 status
    // res.end("<h1>Uploading will ne completed soon...</h1>");
  } catch (error) {
    console.error("Something went wrong in book Controller", error);
    res
      .status(500)
      .json({ message: "Failed to add book", error: error.message });
  }
}

async function getBooks(req, res) {
  try {
    let books = await Book.find({});
    console.log("Found books:", books); // Log books
    if (!books) {
      return res.status(404).send("No books found");
    }
    res.render("booktable", { books: books });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
}

async function getBookForEdit(req, res) {
  try {
    // res.render("studentedit", { student: student });
    let id = req.params.id;
    console.log("Books Id: " + id);
    let book = await Book.findOne({ _id: id });
    console.log("Book: " + Book);
    // res.send(student);
    res.render("bookforupdate", { book: book });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

async function updateBook(req, res) {
  try {
    let id = req.params.id;
    console.log("Book Id: " + id);
    let book = await Book.findOne({ _id: id });
    console.log("Book: ", book);
    book.bookTitle = req.body.bookTitle;
    book.bookAuthor = req.body.bookAuthor;
    book.publisherName = req.body.publisherName;
    book.language = req.body.language;
    book.edition = req.body.edition;
    book.isbn = req.body.isbn;
    book.origin = req.body.origin;
    book.noOfPages = req.body.noOfPages;
    book.pricePerUnit = req.body.pricePerUnit;
    await book.save();
    let books = await Book.find({});
    res.render("booktable", {
      books: books
    });
    // res.end("<h1>Something is happeing while updation!!</h1>");
  } catch (err) {
    console.error("Something went wrong!!", err);
  }
}

async function deleteBook(req, res) {
  try {
    let id = req.params.id;
    console.log("Book Id: " + id);
    await Book.deleteOne({ _id: id });
    let books = await Book.find({});
    res.render("booktable", {
      books: books
    });
  } catch (err) {
    console.error("Something went wrong!!", err);
  }
}

module.exports = {
  addBook,
  getBooks,
  getBookForEdit,
  updateBook,
  deleteBook
};
