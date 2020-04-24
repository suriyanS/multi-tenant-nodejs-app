// var mysql = require('mysql');
// import {config} from './env';

// var con = mysql.createConnection({
//     user: config.DB_USER,
//     host: config.DB_HOST,
//     port: config.DB_PORT,
//     database: config.DB_DATABASE,
//     password: config.DB_PASSWORD
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

export function commonDbConnection (con,sql){
    con.connect(function(err) {
        if (err) throw err;
        console.log("DB Connected!");
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(sql + " Executed");
          console.log(result);
          return result;
        });
      });
}