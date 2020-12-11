let admin = "5fcfebf7b5ff86fded638aa4"

function activeUser(req) {
    if (!req.session.authenticated) {
        req.app.locals.currentUserID = "";
    }
} // Checks for user inactivity

exports.activeUser = activeUser
exports.admin = admin;