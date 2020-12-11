var express = require('express');
var router = express.Router();
const active = require("./activeUser");

/* GET home page. */
router.get('/', (req, res) =>  {
  active.activeUser(req);
  res.render('home');
});

module.exports = router;