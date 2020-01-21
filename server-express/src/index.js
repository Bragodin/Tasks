const express = require('express');
const app = express();
const router = require('./routers/export-router');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/usersdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(express.json());
app.use('/', router.userRouter);
app.use('/', router.petRouter);
app.use('/', router.fileRouter);
app.listen(3000, function () {
  console.log('app listening on port 3000');
});