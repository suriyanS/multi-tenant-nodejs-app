import mysql from 'mysql';


// const knexConfig = {
//   client: process.env.DB_CLIENT,
//   connection: {
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD
//   },
//   pool: { min: 2, max: 20 }
// };

// export default knex(knexConfig);
export var connection = mysql.createConnection({
  user: config.DB_USER,
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_DATABASE,
  password: config.DB_PASSWORD
});
