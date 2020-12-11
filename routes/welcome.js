var express = require('express');
var router = express.Router();
const active = require("./extensions/activeUser");

/* GET home page. */
router.get('/', (req, res) =>  {
  active.activeUser(req);
  res.render('welcome', {
    User: req.app.locals.user,
    Admin: req.app.locals.admin
  });
});

module.exports = router;