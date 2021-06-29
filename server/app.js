const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./keys");
const PORT = 5000;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection success to mongo atlas!!");
  })
  .catch((err) => {
    console.log(err);
  });

//requrire model
require("./models/user");

//parsing req to json
app.use(express.json());

//then using routers
app.use(require("./routes/auth"));

app.listen(PORT, () => {
  console.log("listening to the port", PORT);
});
