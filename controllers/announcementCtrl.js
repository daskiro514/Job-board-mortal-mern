const Announcement = require('../models/Announcement');

/**
 * Create a new announcement
*/
exports.create = (req, res) => {
  let featuredImage = req.file ? req.file.filename : !!req.body.featuredImage ? req.body.featuredImage : '';
  //  Create a new announcement
  new Announcement({
    headline: req.body.headline,
    featuredImage: featuredImage,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    content: req.body.content,
    audience: req.body.audience.split(','),
    creator: req.body.creator
  }).save()
    .then(result => {
      //  Send the client the created announcement as the response data 
      Announcement.findById(result._id)
        .populate('audience')
        .populate('creator')
        .then(result2 => {
          res.json(result2);
        })
        .catch(error => {
          res.status(500).send('Server Error!');
        })
    })
    .catch(error => {
      res.status(500).send('Server Error!');
    })
}

/**
 * Get all announcements
*/
exports.getAll = (req, res) => {
  Announcement.find()
    .populate('audience')
    .populate('creator')
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      res.status(500).send('Server Error!');
    })
}