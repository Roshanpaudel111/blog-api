const express = require("express");
const app = express();
const dotenv = require("dotenv");
const multer = require('multer')
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const catRoute = require("./routes/categories");
dotenv.config();
mongoose
  .connect(process.env.MONGO_LOCAL_URL)
  .then(() => {
    console.log("connection open!!");
  })
  .catch((err) => {
    console.log(err);
  });

//multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image")
  }, filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded successfully !!")
})

//middlewares
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);

app.listen(3000, () => {
  console.log("Listening to 3000");
});
