const connection = require('../db/db');


function getMoney (req, res) {
  const userId = req.user;
  let money;
  const sql = `SELECT money FROM users WHERE id = '${userId}'`;
  
  // 쿼리 실행 후 프라미스 반환
  new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) reject(err);
      money = result[0].money;
      resolve();
    });
  })
  .then(() => {
    console.log(money);
    res.render('numberGame', {
      userdata: `반갑습니다 ${req.user}님`,
      money: `${money}원`
    });
  })
  .catch(err => {
    console.error(err);
    res.json({ err: err });
  });
}

function playGame (req,res) {
  const type = req.body.type
  const bat = req.body.bat
  const num = req.body.Num
  let money;
  let sql;
  // type이 홀수 일 때
  if (type === 'odd') {
    if (num % 2 === 1) {
      sql = `update users set money = money + ${bat * 2} where id = '${req.user}'`
    } else {
      sql = `update users set money = money - ${bat} where id = '${req.user}'`
    }
  }
  else if (type === 'even') {
    if (num % 2 === 0) {
      sql = `update users set money = money + ${bat * 2} where id = '${req.user}'`
    } else {
      sql = `update users set money = money - ${bat} where id = '${req.user}'`
    }
  }
  else if (type === 'up') {
    if (num > 5) {
      sql = `update users set money = money + ${bat * 2} where id = '${req.user}'`
    } else {
      sql = `update users set money = money - ${bat} where id = '${req.user}'`
    }
  }
  else if (type === 'down') {
    if (num <= 5) {
      sql = `update users set money = money + ${bat * 2} where id = '${req.user}'`
    } else {
      sql = `update users set money = money - ${bat} where id = '${req.user}'`
    }
  }
  connection.query(sql, (err) => {
    if (err) return res.send(err);
  })

  new Promise((resolve, reject) => {
    sql = `SELECT money FROM users WHERE id = '${req.user}'`
    
    connection.query(sql, (err, result) => {
      if (err) return reject(err);
      money = result[0].money;
      resolve();
    })
  })
  .then(() => {
    res.render('numberGame', {
      userdata: `반갑습니다 ${req.user}님`,
      money: `${money}원`
    })
  })
}

module.exports = {
  getMoney,
  playGame
};