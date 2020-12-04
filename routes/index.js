var express = require('express');
var router = express.Router();
const application = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  application.activeUser(req);
  res.render('index');
});

module.exports = router;
