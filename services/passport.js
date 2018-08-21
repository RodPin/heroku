const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (acessToken, refreshToken, profile, done) => {
      // console.log("acess token :", acessToken);
      // console.log("------------------------------------------------------");
      // console.log("refresh token", refreshToken);
      // console.log("------------------------------------------------------");
      // console.log("profile", profile);
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //whe have a record with a profile id
          done(null, existingUser);
        } else {
          //we dont have  a user in the record with this id
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
