const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = mongoose.model('users');
const keys = require('./keys');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secret
}


module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwtPayload, done) => {
            User.findById(jwtPayload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false, 'user not found.')
                })
                .catch(error => {
                    console.log(error);
                    throw (error);
                })
        }))
}