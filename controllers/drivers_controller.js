/**
 * Created by alex on 31.01.18.
 */
const Driver = require('../models/driver');
module.exports = {
  greeting(req, res){
    res.send({hi: 'there'});
  },

  create(req, res, next){
    const driver = req.body;

    Driver.create(driver)
      .then((driver) => res.send(driver))
      .catch(next);
  },

  update(req, res, next){
    const driverId = req.params.id;
    const driverParams = req.body;

    Driver.findByIdAndUpdate(driverId, driverParams, {new: true})
      .then((driver) => res.send(driver))
      .catch(next);
  },

  remove(req, res, next){
    const driverId = req.params.id;

    Driver.findByIdAndRemove(driverId)
      .then((driver) => {
        res.status(204).send(driver)
      })
      .catch(next);
  },
};