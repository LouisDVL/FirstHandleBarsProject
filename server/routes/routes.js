const express = require("express");
const router = express.Router();
const bookController = require("../controller/booksController");
const indexController = require("../controller/indexController");

//main page
router.get("/", indexController.view);

//url for books
router.get("/books", bookController.view);
router.get("/books/newbook", bookController.createForm);
router.post("/books/newbook", bookController.createBook);
router.get("/books/edit/:id", bookController.editFormView);
router.post("/books/edit/:id", bookController.editBook);

module.exports = router;
