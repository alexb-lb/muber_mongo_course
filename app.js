/** Created by alex on 31.01.18. */
const express = require('express');
const routes = require('./routes/routes');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test'){
  mongoose.connect('mongodb://localhost/muber');
}

// handle json
app.use(bodyParser.json());

// routes
routes(app);

// error handler (invalid arguments when insert to DB for example)
app.use((err, req, res, next) => {
  res
    .status(422)
    .send({error: err.message})
});

module.exports = app;
