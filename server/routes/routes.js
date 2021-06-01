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

module.exports = router;
