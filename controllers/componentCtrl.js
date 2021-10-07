const Component = require('../models/Component')

/**
 * Create a new component
 */
exports.create = (req, res) => {
  Component.findOne(req.body).then((result) => {
    if (result) {
      res.status(500).send('Server Error!')
    } else {
      new Component({
        name: req.body.name,
        layout: req.body.layout
      })
        .save()
        .then((result2) => {
          Component.findById(result2._id)
            .populate('layout')
            .then((result3) => {
              res.json(result3);
            })
            .catch((error) => {
              res.status(500).send('Server Error!')
            })
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send('Server Error!')
        });
    }
  })
  .catch((error) => {
    res.status(500).send('Server Error!')
  });
}

/**
 * Get all components
*/
exports.getAll = (req, res) => {
  Component.find()
    .populate('layout')
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      res.status(500).send('Server Error!')
    })
}