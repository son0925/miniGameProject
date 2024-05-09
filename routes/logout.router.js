const express = require('express');
const passport = require('passport');
const logoutRouter = express.Router();
logoutRouter.get('/', (req,res) => {
  req.logout((err) => {
    if (err) return res.err;
    res.redirect('/')
  })
})

module.exports = logoutRouter;