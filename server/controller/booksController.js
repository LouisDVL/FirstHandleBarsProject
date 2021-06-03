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
        "SELECT id, CONCAT(firstName, ' ', lastName) AS fullName FROM authors; SELECT * FROM publishers;",
        (err, rows) => {
          connection.release();
          if (err) throw error;
          else {
            const authors = rows[0];
            const publishers = rows[1];
            res.render("./books/createForm", { authors, publishers });
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

exports.editFormView = (req, res) => {
  serverPool.getConnection((err, connection) => {
    if (err) throw err;
    else {
      connection.query(
        "SELECT books.id,bookName,publishDate,publisherId,authors.id AS authorId, CONCAT(authors.firstName,' ', authors.lastName) AS fullname, publishers.id AS publisherId, publishers.name AS publisherName FROM books INNER JOIN authors ON books.authorId = authors.id INNER JOIN publishers ON books.publisherId = publishers.id WHERE books.id = ?; SELECT authors.id, CONCAT(authors.firstName, ' ', authors.lastName) AS fullName FROM authors; SELECT * FROM publishers;",
        [req.params.id],
        (err, rows) => {
          if (err) throw err;
          const book = rows[0][0];
          const authors = rows[1];
          const publishers = rows[2];
          book.publishDate = book.publishDate.toISOString();
          book.publishDate = book.publishDate.substring(0, 10);
          res.render("./books/editForm", { book, authors, publishers });
        }
      );
    }
  });
};

exports.editBook = (req, res) => {
  const id = req.params.id;
  const { bookName, author, publishDate, publisher } = req.body;
  serverPool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "UPDATE books SET bookName = ?, authorId = ?, publishDate = ?, publisherId = ? WHERE id = ?",
      [bookName, author, publishDate, publisher, id],
      (err, rows) => {
        if (err) throw err;
        res.redirect("/books");
      }
    );
  });
};

exports.deleteBook = (req, res) => {
  const id = req.params.id;
  serverPool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM books WHERE id = ?", [id], (err, rows) => {
      if (err) throw err;
      res.redirect("/books");
    });
  });
};
