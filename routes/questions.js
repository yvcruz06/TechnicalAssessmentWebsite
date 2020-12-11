var express = require('express');
var router = express.Router();
const active = require("./extensions/activeUser");
const queries = require("./extensions/queries");
const Quiz = require('../models/quiz');

// TODO: List all the available pages.
router.get('/', async (req, res) => {
  if (active.admin == req.app.locals.currentUserID) {
    const questions = await getAllQuestions();

    res.render('allQuestions', {
      User: req.app.locals.user,
      Admin: req.app.locals.admin, 
      Questions: questions 
    });
  } else {
    res.redirect('/');
  }

});

// Create a question page.
router.get('/create', async (req, res) => {
  const topics = await getTopics();
  const languages = await queries.getLanguages();
  const choices = ["A", "B", "C", "D"];

  res.render('newQuestion', { 
    User: req.app.locals.user,
    Admin: req.app.locals.admin,
    Choices: choices,
    CurrentTopics: topics,
    CurrentLangs: languages
  });
});

router.post('/create/new', async (req, res) => {
  if (req.body.language == "new") {
    req.body.language = req.body.newLanguage;
  }

  if (req.body.topic == "new") {
    req.body.topic = req.body.newTopic;
  }

  let list = [req.body.choiceA, req.body.choiceB, req.body.choiceC, req.body.choiceD];

  const newQuestion = new Quiz({
    topic: req.body.topic,
    language: req.body.language,
    question: req.body.question,
    choices: list,
    answer: list[req.body.answer],
    explanation: req.body.explanation,
    attempts: 0,
    correct: 0
  });

  newQuestion.save()
  .then((result) => {
    if (result != null) {
      res.redirect('/question');
    }
  })
  .catch((error) => {
    console.log(error);
  });

});

// Edit a question page.
router.post('/edit', async (req, res) => {
  const topics = await getTopics();
  const languages = await queries.getLanguages();
  const choices = ["A", "B", "C", "D"];
  const question = await getQuestion(req.body.quest);
  console.log(question)

  res.render('editQuestion', {
    User: req.app.locals.user,
    Admin: req.app.locals.admin,
    Choices: choices,
    CurrentTopics: topics,
    CurrentLangs: languages,
    Question: question
  });

});

router.put('/edit/:id', async (req, res) => {
  console.log(req.body);

  if (updateQuestion(req.body)) {
    res.redirect('/question');
  }

})

// Delete a question page.
router.post('/delete', async (req, res) => {
  const question = await getQuestion(req.body.item);

  res.render('deleteQuestion', {
    User: req.app.locals.user,
    Admin: req.app.locals.admin,
    Question: question
  });

});

router.delete('/delete/:id', async (req,res) => {
  if (deleteQuestion(req.body.id)) {
    res.redirect('/question');
  }

})

/**
 * Returns a list of unique topics based on all questions
 * or an empty list
 */
async function getAllQuestions() {
  let list = [];

  await Quiz.find({}, '-__v -createdAt -updatedAt -choices -answer -explanation')
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
 * Returns the specific question
 * or an empty list
 */
async function getQuestion(id) {
  let list = [];
  
  await Quiz.findById(id)
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
 * Returns true if question is updated
 */
async function updateQuestion(body) {
  let questUpdated = false;
  let list = [body.choiceA, body.choiceB, body.choiceC, body.choiceD];
  
  await Quiz.findByIdAndUpdate(body.id, {
    topic: body.topic,
    language: body.language,
    question: body.question,
    choices: list,
    answer: list[body.answer],
    explanation: body.explanation,
    attempts: 0,
    correct: 0
  })
  .exec()
  .then((result) => {
    if (result != null) {
      questUpdated = true;
    }
  }).catch((error) => {
    console.log(error);
  });
  
  return questUpdated;
}

/**
 * Returns true if the question is deleted
 */
async function deleteQuestion(id) {
  let isDeleted = false;
  
  await Quiz.findByIdAndDelete(id)
  .exec()
  .then((result) => {
    if (result != null) {
      isDeleted = true;
    }
  }).catch((error) => {
    console.log(error);
  });
 
  return isDeleted;
}

module.exports = router;
