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
  res.render('index', {
    userdata: req.user ? '반갑습니다 '+ req.user : ''
  });
});
// 로그인 페이지 이동
app.get('/login',checkNotAuthenticated, (req,res) => {
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
app.get('/signup',checkNotAuthenticated, (req,res) => {
  res.render('signup')
})
// 회원가입 콜백
app.post('/signup/callback', (req,res) => {
  const user = req.body;
  console.log(user);
  if (user.password !== user.checkPassword) {
    return res.send('비번 틀리셨어요')
  }
  if (user.password.length < 7) {
    return res.send('비번 길이는 7글자 이상입니다')
  }
  let sql = `select * from users where id = '${user.id}'`
  console.log(sql);
  connection.query(sql, (err,result) => {
    if (err) return res.json({msg: '회원가입 에러'});
    if (result.length === 0) {
      sql = `INSERT INTO users (id, password, name, birthday, email)
      VALUES ('${user.id}', '${user.password}', '${user.name}', '${user.birthday}', '${user.email}@${user.emailOption}');`
      console.log(sql);
      connection.query(sql, (err) => {
        if (err) return res.send('회원가입 오류');
      })
    }
  });
  
  res.redirect('/login');
})

// 로그아웃
app.get('/logout', (req,res) => {
  req.logout((err) => {
    if (err) return res.err;
    res.redirect('/')
  })
})

// 숫자 미니게임
app.get('/numberGame', checkAuthenticated, (req,res) => {
  res.render('numberGame', {
    userdata: `반갑습니다 ${req.user}님`
  })
})




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

passport.use('local', LocalStrategyConfig);

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

function checkAuthenticated (req,res,next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}

function checkNotAuthenticated(req,res,next) {
  if (req.isAuthenticated()) {
    console.log('이미 로그인 완료')
    return res.redirect('/');
  }
  next();
}


app.listen(port, () => {
  console.log(`서버 열기 성공 ${port}`);
})
