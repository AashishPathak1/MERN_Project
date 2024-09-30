const express = require("express");
const router = express.Router();
const bookcontroller = require("../controllers/bookcontroller"); // Assuming this is your controller

// route to add the book
router.post("/add/book", (req, res) => {
  bookcontroller.addBook(req, res);
  // res.render("addBook");
});

// route to get the book from database
router.get("/booktable", (req, res) => {
  bookcontroller.getBooks(req, res);
});

// rendering to the main admin page
// router.get("/adminpanel", (req, res) => {
//   res.render("adminpanel");
// });

router.get("/addbooks", (req, res) => {
  res.render("addbooks");
});

router.get("/edit/book/:id", (req, res) => {
  bookcontroller.getBookForEdit(req, res);
});

router.post("/update/book/:id", (req, res) => {
  bookcontroller.updateBook(req, res);
});

router.get("/delete/book/:id", (req, res) => {
  bookcontroller.deleteBook(req, res);
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// exporting the router to use this routes at the index.js
module.exports = router;
