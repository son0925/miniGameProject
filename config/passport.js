const passport = require('passport');
const connection = require('../db/db');
const LocalStrategy = require('passport-local').Strategy



const LocalStrategyConfig = new LocalStrategy({usernameField: 'id', passwordField: 'password'},
  (id, password, done) => {
    const sql = `select * from users where id = '${id}'`;
    connection.query(sql, (err, result) => {
      if (err) return done(err, null, {msg: '그냥 에러난 것 같다'});

      if (!result) return done(err, null, {msg: '존재하지 않는 아이디 입니다'});

      for (let i = 0; i < result.length; i++) {
        if (result[i].password === password) {
          return done(null, result[i]);
        }
      }
      return done(null, false, {msg: '잘못된 비밀번호입니다'})
    })
  }
)
passport.serializeUser((user,done) => {
  return done(null, user);
})
passport.deserializeUser(async (data, done) => {
  console.log(data)
  try {
    const user = data.id;
    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err);
  }
});


passport.use('local', LocalStrategyConfig);
