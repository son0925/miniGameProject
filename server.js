const express = require('express');
const mongodb = require('mongoose');
const path = require('path');
const signRouter = require('./routes/sign.router')
const passport = require('passport');


const port = 4000;

const app = express();

// templateEngine set
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'views'));

// passport 설정
app.use(passport.initialize());
app.use(passport.session());

// 몽고 db Connect
mongodb.connect('mongodb+srv://son0925:1234@son0925.kwzwdli.mongodb.net/')
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log(`에러 : ${err}`)
  });

// 유저 로그
app.use((req,res,next) => {
  const timer = Date.now();
  console.log(`${req.url}   ${req.method}`)
  next();
  const diffTimer = Date.now() - timer;
  console.log(`${req.baseUrl}   ${req.method}   ${diffTimer}ms`)
})

// 정적 파일 제공
app.use('/static',express.static(path.join(__dirname, 'public')));
// json 파일 읽기
app.use(express.json());


// 서버 환경 설정 -------------------------------------------------------------------------------------------------

// 메인 홈페이지
app.get('/', (req,res) => {
  res.render('index');
})

// 로그인 회원가입 라우터
app.use('/sign', signRouter);




app.listen(port, () => {
  console.log(`Lintening On ${port}`);
})