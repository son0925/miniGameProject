let oddNumEl = document.querySelector('.oddNum');
let evenNumEl = document.querySelector('.evenNum');
let upNumEl = document.querySelector('.upNum');
let downNumEl = document.querySelector('.downNum');

oddNumEl.addEventListener('click', () => {
  let battingMoney = parseInt(document.querySelector('input').value);
  let numberEl = document.querySelector('.number')
  let ranNum = Math.floor(Math.random() * 10+1);
  numberEl.innerHTML = ranNum;
  fetch('/numberGame/choice', {
    method: 'POST', // 요청 메소드 설정
    headers: {
      'Content-Type': 'application/json' // 요청 헤더 설정
    },
    body: JSON.stringify({
      type: 'odd',
      bat: battingMoney,
      Num: ranNum
    })
  })
  .then(res => {
    res.json();
  })
  .then(data => {
    console.log(data)
  })
})

evenNumEl.addEventListener('click', () => {
  let battingMoney = parseInt(document.querySelector('input').value);
  let numberEl = document.querySelector('.number')
  let ranNum = Math.floor(Math.random() * 10+1);
  numberEl.innerHTML = ranNum;
  fetch('/numberGame/choice', {
    method: 'POST', // 요청 메소드 설정
    headers: {
      'Content-Type': 'application/json' // 요청 헤더 설정
    },
    body: JSON.stringify({
      type: 'even',
      bat: battingMoney,
      Num: ranNum
    })
  })
  .then(res => {
    res.json();
  })
  .then(data => {
    console.log(data)
  })
})

upNumEl.addEventListener('click', () => {
  let battingMoney = parseInt(document.querySelector('input').value);
  let numberEl = document.querySelector('.number')
  let ranNum = Math.floor(Math.random() * 10+1);
  numberEl.innerHTML = ranNum;
  fetch('/numberGame/choice', {
    method: 'POST', // 요청 메소드 설정
    headers: {
      'Content-Type': 'application/json' // 요청 헤더 설정
    },
    body: JSON.stringify({
      type: 'up',
      bat: battingMoney,
      Num: ranNum
    })
  })
  .then(res => {
    res.json();
  })
  .then(data => {
    console.log(data)
  })
})

downNumEl.addEventListener('click', () => {
  let battingMoney = parseInt(document.querySelector('input').value);
  let numberEl = document.querySelector('.number')
  let ranNum = Math.floor(Math.random() * 10+1);
  numberEl.innerHTML = ranNum;
  fetch('/numberGame/choice', {
    method: 'POST', // 요청 메소드 설정
    headers: {
      'Content-Type': 'application/json' // 요청 헤더 설정
    },
    body: JSON.stringify({
      type: 'down',
      bat: battingMoney,
      Num: ranNum
    })
  })
  .then(res => {
    res.json();
  })
  .then(data => {
    console.log(data)
  })
})