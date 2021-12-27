const { Pool } = require("pg");

const options = {
  user: "postgres",
  password: "postgres",
  host: "127.0.0.1",
  database: "vehicles_db",
  port: 5432,
};

const pg_client = new Pool(options);
try {
  pg_client.connect();
  console.log("::> PostgreSQL Server is Ready");
} catch (err) {
  console.log(err.stack);
}

exports.pg_client = pg_client;
