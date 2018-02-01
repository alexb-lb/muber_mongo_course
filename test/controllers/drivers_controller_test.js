/**
 * Created by alex on 31.01.18.
 */
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('POST to /api/driver creates a new driver', (done) => {
    const driverObj = {email: 'test@test.com'};

    request(app)
      .post('/api/drivers')
      .send(driverObj)
      .end((err, response) => {
        assert(response.status === 200);
        Driver.findOne({email: driverObj.email})
          .then((driver) => {
            assert(driver.email === driverObj.email);
            done();
          })
      })
  });


  it('PUT to /api/driver/id edits an existing driver', (done) => {
    const driver = new Driver({email: 'test@test.com', driving: false});
    const optionsToUpdate = {email: 'test1234@test.com', driving: true};

    driver.save()
      .then(() => {
        request(app)
          .put(`/api/drivers/${driver._id}`)
          .send(optionsToUpdate)
          .end((err, response) => {
            assert(response.status === 200);
            assert(response.body.email === optionsToUpdate.email);
            assert(response.body.driving === optionsToUpdate.driving);
            done();
          })
      });
  });

  it('DELETE to /api/driver/id updates an existing driver', (done) => {
    const driver = new Driver({email: 'test@test.com'});

    driver.save()
      .then(() => {
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end((err, response) => {
            assert(response.status === 204);

            Driver.findOne({_id: driver._id})
              .then((driver) => {
                assert(driver === null);
                done();
              })
          })
      });
  });
});