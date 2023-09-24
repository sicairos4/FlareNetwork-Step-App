// auth.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: 'YOUR_CLIENT_ID', // Replace with your Google OAuth client ID
      clientSecret: 'YOUR_CLIENT_SECRET', // Replace with your Google OAuth client secret
      callbackURL: '/auth/google/callback', // Modify the URL based on your app's routes
    },
    (accessToken, refreshToken, profile, done) => {
      // Implement user creation and session management here if needed
      return done(null, profile);
    }
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
