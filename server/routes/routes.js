const express = require("express");
const router = express.Router();
const bookController = require("../controller/booksController");
const indexController = require("../controller/indexController");

//main page
router.get("/", indexController.view);

//url for books
router.get("/books/newbook", bookController.createForm);
router.get("/books", bookController.view);

module.exports = router;
