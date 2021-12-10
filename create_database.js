const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nav@gur1",
    database: "userdetail",
})

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("database connected");
//     var sql = "DROP TABLE data_id";
//     db.query(sql, function(err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("database connected");
//     var sql = "CREATE TABLE registration(id INT AUTO_INCREMENT PRIMARY KEY,email VARCHAR(320) NOT NULL ,password VARCHAR(255) NOT NULL)"
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("table created");
//     })
// })

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("database connected");
//     var sql = "CREATE TABLE postData (post_id INT AUTO_INCREMENT PRIMARY KEY, user_email VARCHAR(320) NOT NULL,title VARCHAR(200) NOT NULL ,text VARCHAR(5000) NOT NULL)"
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("table created");
//     })
// })

// db.connect(function(err) {l
//     if (err) throw err;
//     console.log("database connected");
//     var sql = "CREATE TABLE options (post_id INT NOT NULL, user_email VARCHAR(320) NOT NULL,likes INT(255) NOT NULL DEFAULT (0) ,dislikes INT(255) NOT NULL DEFAULT(0))"
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("table created");
//     })
// })



// knex.schema.hasTable("registration").then(function(exists) {
//     if (!exists) {
//         console.log({ Success: `registration table created successfully.` });
//         return knex.schema.createTable("registration", function(t) {
//             t.increments("id").primary();
//             t.string("email", 320);
//             t.string("password", 60);
//         });
//     } else {
//         console.log({ Sorry: `registration table already exist!` });
//     }
// });



module.exports = db