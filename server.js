const express = require("express");
const cors = require("cors");

const app = express();

var corsOption = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOption));

//Parse request of content type - application/json
app.use(express.json());

//Parse request of content type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models/index");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Cannot connect to database", err);
    process.exit();
  });

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Wellcome to Michael Osas CRUD appliction" });
});

require("./app/routes/tutorial.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
