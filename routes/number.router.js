const express = require('express');
const { checkAuthenticated } = require('../controllers/login.controller');
const numberRouter = express.Router();

numberRouter.get('/', checkAuthenticated, (req,res) => {
  res.render('numberGame', {
    userdata: `반갑습니다 ${req.user}님`
  })
})


module.exports = numberRouter;