const knex = require("knex");
const app = require("./app");
const { PORT } = require("./config");
// const PORT = process.env.PORT || 8000;

const db = knex({
  client: "pg",
  connection: DB_URL
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server is Listening at http://localhost:${PORT}`);
});
