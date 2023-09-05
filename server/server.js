const express = require("express");
const app = express();
const PORT = 4000;
const multer = require("multer");
const form_data = multer();

//const api = require("./routes/index");
const api = require("./routes/index");
app.use(express.json());
app.use(form_data.array());
app.use(express.urlencoded({ extended: false }));
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Get Request Server Response Success");
});

app.listen(PORT, () => {
  console.log(`Server run : http://localhost:${PORT}/`);
});
