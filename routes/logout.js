var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
  if (req.app.locals.currentUserID != "") {
    req.app.locals.currentUserID = "";
    req.app.locals.user = false;
    req.app.locals.admin = false;
    req.session.destroy();
    res.render('welcome', {
      User: req.app.locals.user,
      Admin: req.app.locals.admin
    });
  }
}); // Log the user out

module.exports = router;