const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const { urlencoded } = require('express');
dotenv.config();
mongoose
  .connect(process.env.MONGO_LOCAL_URL)
  .then(() => {
    console.log('connection open!!');
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(express.json());

//routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.listen(3000, () => {
  console.log('Listening to 3000');
});
