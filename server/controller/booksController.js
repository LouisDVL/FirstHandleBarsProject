const mysql = require("mysql");

const serverPool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//This will be the index controller route
exports.view = (req, res) => {
  serverPool.getConnection((err, connection) => {
    if (err) throw err;
    else {
      console.log(`Connection ID ${connection.threadId}`);
      //This is the database query.
      connection.query("SELECT * FROM books", (err, rows) => {
        //When done with connection release
        connection.release();
        if (err) console.log(err);
        else {
          res.render("./books/index", { rows });
          console.log(rows);
        }
      });
    }
  });
};
