const express = require('express');
const port = 4000;
const app = express();
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'test'
});


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'views'))


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/static', express.static(path.join(__dirname,'public')));
app.use(passport.initialize());
app.use(session({
  secret: 'son', // 세션을 암호화할 때 사용되는 비밀키
  resave: false,
  saveUninitialized: true
}));
app.use(passport.session());


app.get('/', (req, res) => {
  res.render('index');
});
// 로그인 페이지 이동
app.get('/login', (req,res) => {
  console.log(req.user);
  res.render('login');
})
// 로그인 콜백
app.post('/login/callback', (req,res,next) => {
  passport.authenticate('local', (err,user,info) => {
    if (err) return res.json(info);
    if (!user) return res.json(info)
    
    req.login(user, function (err) {
      if (err) return next(err);

      res.redirect('/')
    })
  })(req,res,next)
})
// 회원가입 페이지 이동
app.get('/signup', (req,res) => {
  res.render('signup')
})
// 회원가입 콜백
// app.post('/signup/callback', (req,res) => {
  
// })




const LocalStrategyConfig = new LocalStrategy({usernameField: 'id', passwordField: 'password'},
  (id, password, done) => {
    const sql = `select * from users where username = '${id}'`;
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

passport.use('local', LocalStrategyConfig);

passport.serializeUser((user,done) => {
  return done(null, user);
})
passport.deserializeUser(async (data, done) => {
  console.log(data)
  try {
    const user = data.username;
    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err);
  }
});


app.listen(port, () => {
  console.log(`서버 열기 성공 ${port}`);
})
