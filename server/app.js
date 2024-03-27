const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 6969;
const { MONGOURI } = require('./keys');
const cors = require('cors');
// const {insertData} = require('./insertData')

mongoose.connect(MONGOURI);
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo');

  // insertData()
});

mongoose.connection.on('error', err => {
  console.log('error connecting', err);
});

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true
  })
);
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(PORT, () => {
  console.log('server is running on', PORT);
});
