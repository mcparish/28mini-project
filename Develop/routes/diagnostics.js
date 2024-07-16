const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));

});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  const { errorId, timestamp, errorDescription } = req.body;
  
  // TODO: Logic for appending data to the db/diagnostics.json file
  readAndAppend('./db/diagnostics.json', JSON.stringify({
    errorId,
    timestamp,
    errorDescription,
    diagnostic_id: uuidv4(),
  }), { flag: 'a' });

  res.status(201).json({ message: 'Error logged successfully' });
});

module.exports = diagnostics;
