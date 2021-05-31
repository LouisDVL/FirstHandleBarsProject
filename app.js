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

//This will configure the routes for the website (separation of concerns)
const routes = require("./server/routes/routes");
app.use("/", routes);

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});
