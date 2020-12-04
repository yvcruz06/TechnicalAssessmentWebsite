var express = require('express');
var router = express.Router();
const active = require("./activeUser");

/* GET home page. */
router.get('/', (req, res) =>  {
  active(req);
  res.render('index');
});

module.exports = router;