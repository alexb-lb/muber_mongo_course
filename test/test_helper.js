/**
 * Created by alex on 31.01.18.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// connect to test db
before((done) => {
  mongoose.connect('mongodb://localhost/muber_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.warn('Warning', err));
});

// drop test DB before each test starts
beforeEach((done) => {
  const {drivers} = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => drivers.ensureIndex({'geometry.coordinates': '2dsphere'}))
    .then(() => done())
    .catch(() => done());
});
