const express = require('express');
const app = express();
const router = require('./routers/export-router');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const documents = {};
require('dotenv').config({ path: 'config/build.env'});

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/', router.userRouter);
app.use('/', router.petRouter);
app.use('/', router.fileRouter);
app.use('/', router.albumRouter);
http.listen(4444);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.listen(port, function () {
  console.log(`app listening on port ${port}`);
});