var express = require('express');
var router = express.Router();

// Model from our Database
const Quiz = require('../models/quiz');

// TODO: List all the available pages.
router.get('/', (req, res) => {
  res.render('questions', { title: 'Sign Up' });
});

// Create a question page.
router.get('/create', async (req, res) => {
  const topics = await getTopics();
  const languages = await getLanguages();
  const choices = ["A", "B", "C", "D"]

  res.render('questions', { 
    title: 'Sign Up',
    Choices: choices,
    CurrentTopics: topics,
    CurrentLangs: languages 
  });
});

router.post('/create/new', async (req, res) => {
  console.log(req.body);

  if (req.body.language == "new") {
    req.body.language = req.body.newLanguage;
  }

  if (req.body.topic == "new") {
    req.body.topic = req.body.newTopic;
  }

  const newQuestion = new Quiz({
    topic: req.body.topic,
    language: req.body.language,
    question: req.body.question,
    choices: [req.body.choiceA, req.body.choiceB, req.body.choiceC, req.body.choiceD],
    answer: req.body.answer,
    explanation: req.body.explanation,
    attempts: 0,
    correct: 0
  });

  // For testing, make sure to comment the save query
  // console.log(req.body.language);
  // console.log(req.body.topic);
  newQuestion.save()
  .then((result) => {
    console.log("Added new question");
    res.redirect('/question/create');
  })
  .catch((error) => {
    console.log(error);
  });

});

/**
 * Returns a list of unique topics based on all questions
 * or an empty list
 */
async function getTopics() {
  let list = [];
  await Quiz.find({}, '-_id topic')
  .distinct('topic')
  .exec()
  .then((result) => {
    if (result != null) {
      list = result;
    }
  }).catch((error) => {
    console.log(error);
  });
  return list;
}

/**
 * Returns a list of unique languages based on all questions
 * or an empty list
 */
async function getLanguages() {
  let list = [];
  await Quiz.find({}, '-_id language')
  .distinct('language')
  .exec()
  .then((result) => {
    if (result != null) {
      list = result;
    }
  }).catch((error) => {
    console.log(error);
  });
  return list;
}

/**
 * This was used for learning purposes!!! Will be deleted later.
 * 
 * Allows to get a list of unique topics based on all questions
 */
router.get('/topics', (req,res) => {
  
  Quiz.find({}, '-_id topic')
  .distinct('topic')
  .exec()
  .then((result) => {
    console.log(result);
    res.send(result);
  }).catch((error) => {
    console.log(error);
  });

});

/**
 * This was used for learning purposes!!! Will be deleted later.
 * 
 * Allows to get a list of unique languages based on all questions
 */
router.get('/languages', (req,res) => {
  Quiz.find({}, '-_id language')
  .distinct('language')
  .exec()
  .then((result) => {
    console.log(result);
    res.send(result);
  }).catch((error) => {
    console.log(error);
  });
});

// TODO: Edit a question page.
router.get('/edit', (req, res) => {
  res.render('editQuestion', { title: 'Sign Up' });
});



module.exports = router;
