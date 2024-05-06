const express = require('express');
const signRouter = express.Router();
const signController = require('../controllers/sign.controller');
const passport = require('passport');
const User = require('../models/user');

// 로그인 페이지 요청
signRouter.get('/in', signController.getSignInPage);

// 로그인 post 요청
signRouter.post('/in', (req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return next({msg: info});

    req.logIn(user, function (err) {
      if (err) return next(err);
      res.redirect('/');
    })
  })(req,res,next)
})

// 회원가입 페이지 요청
signRouter.get('/up', signController.getSignUpPage);debugger

signRouter.post('/up', async (req,res) => {
  // req.body의 내용을 User객체로 저장
  const user = new User(req.body);
  try {
    await user.save();
    res.redirect('/login')
  } catch (error) {
    console.error(error);
  }
})


module.exports = signRouter;
