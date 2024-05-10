const express = require('express');
const { checkAuthenticated } = require('../controllers/login.controller');
const chargeMoneyRouter = express.Router();
const connection = require('../db/db');

chargeMoneyRouter.get('/', checkAuthenticated, (req,res) => {
  res.render('chargeMoney')
})
chargeMoneyRouter.post('/callback',checkAuthenticated, (req,res) => {
  const cgMoney = req.body.chargeMoney;
  if (cgMoney < 5000) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write("<script>alert('충전 금액 규칙에 위배됩니다')</script>").send();
  } else {
    let userId = req.user;
    let sql = `UPDATE users SET money = money + ${cgMoney} where id = '${userId}';`
    connection.query(sql, (err) => {
      if (err) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write("<script>alert('아이디를 찾지 못했습니다')</script>").send();
      } else {
        req.session.message = '충전이 완료 되었습니다'
        res.redirect('/')
      }
    })
  }
})


module.exports = chargeMoneyRouter;