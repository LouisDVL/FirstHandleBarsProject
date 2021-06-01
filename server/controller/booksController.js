const mysql = require("mysql");

const serverPool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

//This will be the index controller route
exports.view = (req, res) => {
  serverPool.getConnection((err, connection) => {
    if (err) throw err;
    else {
      //This is the database query.
      connection.query("SELECT * FROM books", (err, rows) => {
        //When done with connection release
        connection.release();
        if (err) console.log(err);
        else {
          res.render("./books/index", { rows });
        }
      });
    }
  });
};

//This will return the form to add a new book
exports.createForm = (req, res) => {
  serverPool.getConnection((err, connection) => {
    if (err) throw error;
    else {
      connection.query(
        "SELECT DISTINCT authors.id AS authorId, authors.firstName, publishers.id AS publisherId, publishers.name FROM books INNER JOIN authors ON books.authorId = authors.id INNER JOIN publishers ON books.publisherId = publishers.id;",
        (err, rows) => {
          connection.release();
          if (err) throw error;
          else {
            res.render("./books/createForm", { rows });
          }
        }
      );
    }
  });
};

exports.createBook = (req, res) => {
  const { bookName, publishDate, author, publisher } = req.body;
  serverPool.getConnection((err, connection) => {
    if (err) throw err;
    else {
      connection.query(
        "INSERT INTO books SET bookName = ?, authorId = ?, publishDate = ?, publisherId = ?",
        [bookName, author, publishDate, publisher],
        (err, rows) => {
          if (err) throw err;
          else {
            res.redirect("/books");
          }
        }
      );
    }
  });
};
