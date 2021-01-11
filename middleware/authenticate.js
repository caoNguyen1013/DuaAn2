var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new GoogleStrategy({
  clientID: '740105811961-398oj82ifqcmb4pdbusl9ua487k0h2t5.apps.googleusercontent.com',
  clientSecret: 'uHxjLn9qXj9_iWIIxccsfhvN',
  callbackURL: "http://localhost:3000/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  // Register user here.
  console.log(profile);
  cb(null, profile);
}
));