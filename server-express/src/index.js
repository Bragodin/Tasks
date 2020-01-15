const express = require('express');
const app = express();
const router = require('./routers/export-router');
const fs = require('fs');

app.use(express.json());
app.use('/', router.userRouter);

app.listen(3000, function () {
  console.log('app listening on port 3000');
});