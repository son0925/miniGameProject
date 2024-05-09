const express = require('express');
const port = 4000;
const app = express();
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const loginRouter = require('./routes/login.router');
const signupRouter = require('./routes/signup.router');
const logoutRouter = require('./routes/logout.router');
const numberRouter = require('./routes/number.router');



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
require('./config/passport')


app.get('/', (req, res) => {
  res.render('index', {
    userdata: req.user ? '반갑습니다 '+ req.user : ''
  });
});

// 로그인 라우터
app.use('/login', loginRouter);
// 회원가입
app.use('/signup', signupRouter);
// 로그아웃
app.use('/logout', logoutRouter);
// 숫자 미니게임
app.use('/numberGame', numberRouter)



app.listen(port, () => {
  console.log(`서버 열기 성공 ${port}`);
})
