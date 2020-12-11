var express = require('express');
var router = express.Router();
const active = require("./activeUser");

const Quiz = require('../models/quiz')

/* GET home page. */
router.get('/', async (req, res) =>  {
  active(req);
  let current_user = req.app.locals.currentUserID
  if(current_user) {
    let languages = []
    await Quiz.find().then((result) => {
      result.forEach(element => {
        languages.push(element.language)
      })
    })
    var options = [...new Set(languages)]

    res.render('index', {
      Option: options
    });
  } else {
    res.redirect('login')
  }


});

module.exports = router;