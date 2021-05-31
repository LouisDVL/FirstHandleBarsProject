const express = require("express");
const app = express();
const mysql = require("mysql");
const exphndlbs = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello and Welcome</h1>");
});

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});
