// const GoogleStrategy = require("passport-google-oauth2").Strategy;
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { getRepository, Not } from 'typeorm';
import { User } from '../entity/User';

const GoogleStrategy = passportGoogle.Strategy;
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
},
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      const userRepository = getRepository(User);
      // if uploading a file
      // const mediaUpload = await streamUpload(request);
      const isEmailExist = await userRepository.findOne({where:{ email: profile.emails[0].value , social_id: Not(profile.id)}})
      if (isEmailExist) {
        throw new Error("Email already exist");

      }
      const isuserExist = await userRepository.findOne({ social_id: profile.id })
      if (isuserExist) {
        return done(null, isuserExist);

      }
      const newUser = {
        social_id: profile.id,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        email: profile.emails[0].value,
        social_login: true,
        social_token: accessToken,
        phone_no: '555-5555-5555'

      }
      const result = await userRepository.save(newUser);
      return done(null, result);
    } catch (error) {
      return done(error, false)
    }
  }
));
