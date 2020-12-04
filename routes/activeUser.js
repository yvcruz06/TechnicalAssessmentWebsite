function activeUser(req) {
    if (!req.session.authenticated) {
        req.app.locals.currentUserID = "";
    }
} // Checks for user inactivity

module.exports = activeUser;