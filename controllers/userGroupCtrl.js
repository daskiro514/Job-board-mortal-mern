const config = require('config');
const UserGroup = require('../models/UserGroup');

/**
 * Create a new user group
*/
exports.create = (req, res) => {
  // console.log(req.body);
  new UserGroup(req.body)
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).send("Server Error!");
    })
}

/**
 * Get all user groups from the db and then send those as response data
*/
exports.getAll = (req, res) => {
  UserGroup.find()
    .sort({ name: 1 })
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      res.status(500).send("Server Error!");
    })
}