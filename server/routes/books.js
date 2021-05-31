const express = require("express");
const routes = express.Router();
const bookController = require("../controller/booksController");

routes.get("/books/", bookController.view);

module.exports = routes;
