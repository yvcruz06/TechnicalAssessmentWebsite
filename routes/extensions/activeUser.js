let admin = "5fd344fe7dc4970c9048edb0"

function activeUser(req) {
    if (!req.session.authenticated) {
        req.app.locals.currentUserID = "";
    }
} // Checks for user inactivity

exports.activeUser = activeUser
exports.admin = admin;