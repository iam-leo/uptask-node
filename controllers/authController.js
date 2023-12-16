import passport from "passport";

const authUser = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
});

const userAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(400).send('Usuario no autenticado');
}

const closeSession = (req, res) => {
    req.session.destroy( () => {
        res.status(200).send('Session closed');
    })
}

export{
    authUser,
    userAuthenticated,
    closeSession
}
