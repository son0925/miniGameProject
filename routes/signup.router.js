const express = require('express');
const { checkNotAuthenticated } = require('../controllers/login.controller');
const connection = require('../db/db')
const signupRouter = express.Router();


signupRouter.get('/',checkNotAuthenticated, (req,res) => {
  res.render('signup')
})
signupRouter.post('/callback', (req,res) => {
  const user = req.body;
  if (user.password !== user.checkPassword) {
    return res.send('비번 틀리셨어요')
  }
  if (user.password.length < 7) {
    return res.send('비번 길이는 7글자 이상입니다')
  }
  let sql = `select * from users where id = '${user.id}'`
  connection.query(sql, (err,result) => {
    if (err) return res.json({msg: '회원가입 에러'});
    if (result.length === 0) {
      sql = `INSERT INTO users (id, password, name, birthday, email, money)
      VALUES ('${user.id}', '${user.password}', '${user.name}', '${user.birthday}', '${user.email}@${user.emailOption}', 0);`
      connection.query(sql, (err) => {
        if (err) return res.send('회원가입 오류');
      })
    }
  });
  req.session.message = '회원가입을 하신 것을 환영합니다'
  res.redirect('/login');
})







module.exports = signupRouter;