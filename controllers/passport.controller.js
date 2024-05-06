const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/user');


passport.serializeUser((user,done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err);
  }
});

const localStrategyConfig = new LocalStrategy({usernameField: 'email', passwordField: 'password'},
  (email, password, done) => {
    User.findOne({
      email: email.toLocaleLowerCase()
    })
    .then(user => {
      if (!user) return done(null, false, {msg: `Email not found`})
      
      user.comparePassword(password, (err,isMatch) => {
        if (err) return done(err);
        if (isMatch) {
          return done(null, user);
        }
        else {
          return done(null, false, {msg: '로그인 정보가 틀립니다'})
        }
      })
    })
    .catch(err => {
      return done(err);
    })
  }
)

passport.use('local', localStrategyConfig);