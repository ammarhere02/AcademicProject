const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {user} = require('../models/models')
const dotenv = require('dotenv');
dotenv.config();

const clientId = process.env.CD2;
const clientSecret = process.env.CS2;


passport.use(new GoogleStrategy({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: 'http://localhost:7090/google/callback'
    },
    async function(accessToken, refreshToken, profile, done) {

    const email = profile.emails[0].value
        console.log(email)
     const [userRecord , created] = await user.findOrCreate(
         {
             where  : {email: email},
         }
     )
        console.log(userRecord)
        console.log('Was user created?', created);
        return done(null, userRecord);
    }
));
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {

    done(null, user);
});


module.exports = passport;