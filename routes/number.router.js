const express = require('express');
const { checkAuthenticated } = require('../controllers/login.controller');
const getMoney = require('../controllers/number.controller');
const numberRouter = express.Router();
const connection = require('../db/db')

numberRouter.get('/', checkAuthenticated, getMoney.getMoney);
numberRouter.post('/choice', checkAuthenticated, getMoney.playGame)



module.exports = numberRouter;