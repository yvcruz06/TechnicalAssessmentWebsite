const Quiz = require('../../models/quiz');

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

exports.getLanguages = getLanguages;