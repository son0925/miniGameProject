const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const loginRouter = require('./routes/login.router');
const signupRouter = require('./routes/signup.router');
const logoutRouter = require('./routes/logout.router');
const numberRouter = require('./routes/number.router');
const chargeMoneyRouter = require('./routes/chargeMoney.router');
const productRouter = require('./routes/products.router');
const mongoose = require('mongoose');




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
require('./config/passport');
app.use((err,req,res,next) => {
  res.json({msg: err})
})

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('MongoDB Connected')
})
.catch((err) => {
  console.log(err)
})


app.get('/', (req, res) => {
  const message = req.session.message; // 세션에서 메시지를 읽어옴
  req.session.message = ''; // 읽은 후에 세션에서 메시지를 초기화
  res.render('index', {
    userdata: req.user ? '반갑습니다 ' + req.user : '',
    message: message // 클라이언트에 전달할 메시지
  });
});


// 로그인 라우터
app.use('/login', loginRouter);
// 회원가입
app.use('/signup', signupRouter);
// 로그아웃
app.use('/logout', logoutRouter);
// 숫자 미니게임
app.use('/numberGame', numberRouter);
// 돈 충전하기
app.use('/chargeMoney', chargeMoneyRouter);
// mongoDB 연습하기 몽고 라우터
app.use('/products', productRouter);




app.listen(port, () => {
  console.log(`서버 열기 성공 ${port}`);
})
