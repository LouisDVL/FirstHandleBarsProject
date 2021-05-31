const express = require("express");
const app = express();
const mysql = require("mysql");
const exphndlbs = require("express-handlebars");

require("dotenv").config();

//Setting up middleware for the projects
app.use(express.json());
app.use(express.urlencoded());

//setting up project to use handle bars
app.engine("hbs", exphndlbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

//serving public folder
app.use(express.static("public"));

//config for the port
const port = process.env.PORT || 3000;

//creating the server pool
const serverPool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

serverPool.getConnection((err, connection) => {
  if (err) throw err;
  else {
    console.log(`Connection ID ${connection.threadId}`);
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Hello and Welcome</h1>");
});

//This will configure the routes for the books
const bookRoutes = require("./server/routes/books");
app.get("/books", bookRoutes);

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});
