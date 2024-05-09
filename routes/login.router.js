const express = require('express');
const { checkNotAuthenticated } = require('../controllers/login.controller');
const passport = require('passport');
const loginRouter = express.Router();

loginRouter.get('/',checkNotAuthenticated, (req,res) => {
  res.render('login');
})

loginRouter.post('/callback', (req,res,next) => {
  passport.authenticate('local', (err,user,info) => {
    if (err) return res.json(info);
    if (!user) return res.json(info)
    
    req.login(user, function (err) {
      if (err) return next(err);

      res.redirect('/')
    })
  })(req,res,next)
})



module.exports = loginRouter;