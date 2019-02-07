const express = require("express");

const app = express();

app.set("view engine", "ejs");

process.env.PWD = process.cwd();
app.use(express.static(process.env.PWD + "/image"));

const routes = require("./routes");

app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening at ${port}!`);
});
