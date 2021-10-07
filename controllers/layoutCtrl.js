const Layout = require('../models/Layout');

/**
 * Create a new layout
*/
exports.create = (req, res) => {
  new Layout(req.body)
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).send('Server Error!');
    });
}

/**
 * Get all layouts
*/
exports.getAll = (req, res) => {
  Layout.find()
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      res.status(500).send('Server Error!');
    })
}