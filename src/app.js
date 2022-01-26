'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const blueprints = require('./blueprints');
const sanitizeRequest = require('./middlewares/sanitize-request');
const getDatabase = require('./database');

module.exports = async () => {

  const db = await getDatabase();

  app.get('/health', (req, res) => {
    res.send('Healthy')
  });

  app.post('/rides', jsonParser, async (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
      });
    }

    if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
      });
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string'
      });
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string'
      });
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string'
      });
    }

    var values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];

    try {

      const statement = await (async () => {
        return new Promise((resolve, reject) => {
          db.run(
            'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values,
            function (err) {
              if (err) {
                reject(err)
              } else {
                resolve(this)
              }
            }
          );
        })
      })();

      const result = await (async () => {
        return new Promise((resolve, reject) => {
          db.all(
            'SELECT * FROM Rides WHERE rideID = ?',
            statement.lastID,
            function (err, rows) {
              if (err) {
                reject(err)
              } else {
                resolve(rows)
              }
            }
          );
        })
      })();

      res.send(result);

    } catch (err) {
      return res.send({
        error_code: 'SERVER_ERROR',
        message: 'Unknown error'
      });
    }
  });

  app.get('/rides', sanitizeRequest(blueprints.rides.getRides), (req, res) => {

    const {
      page,
      limit,
    } = req.query;

    const skip = (page - 1) * limit;

    db.all(`SELECT * FROM Rides LIMIT ${limit} OFFSET ${skip}`, function (err, rows) {
      if (err) {
        return res.send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error'
        });
      }

      if (rows.length === 0) {
        return res.send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides'
        });
      }

      res.send(rows);
    });
  });

  app.get('/rides/:id', (req, res) => {

    // SQL Injection friendly
    // Assume getting localhost:8010/rides/-1' OR '1=1
    const dirtyQuery = `SELECT * FROM Rides WHERE rideID='${req.params.id}'`;
    console.log(dirtyQuery);
    // SELECT * FROM Rides WHERE rideID='-1' OR '1=1'
    // So we need to escape the characters and not generating queries by string manipulation
    db.all(dirtyQuery, function (err, rows) {
      if (err) {
        console.log(err);
        return res.send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error'
        });
      }

      if (rows.length === 0) {
        return res.send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides'
        });
      }

      res.send(rows);
    });
  });

  return app;
};
