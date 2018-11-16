var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TF' });
});

/*. */
router.get('/home', function(req, res, next) {
  res.render('homepage');
});

router.get('/icoplatform', function(req, res, next) {
  res.render('icoplatform');
});

router.get('/icoform', function(req, res, next) {
  res.render('form');
});
router.get('/icolist', function(req, res, next) {
  res.render('listingICO');
});
router.get('/icodetail', function(req, res, next) {
  res.render('icodetail');
});

router.get('/buytoken', function(req, res, next) {
  res.render('tokenbuy');
});

module.exports = router;
