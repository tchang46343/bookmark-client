const app = require("./app");
const { PORT } = require("./config");
// const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is Listening at http://localhost:${PORT}`);
});
