let moneyEl = document.querySelector('.money');

let myMoney = 100000;

window.onload = function() {
  moneyEl.innerHTML = "현재 자금 : " +myMoney;
}

let numList = [];
let numberEl = document.querySelector('.number');
let number;
let battingMoney;
let genealogyEl = document.querySelector('.genealogy');
function randomNumber() {
  number = Math.floor(Math.random() * 10+1);
  battingMoney = parseInt(document.querySelector('input').value);
  if (battingMoney == 0){
    alert('최소 5000원 이상 걸으셔야합니다');
    let text = document.querySelector('input');
    text.value = "";
    return false;
  }
  else if (!battingMoney){
    alert('아무 값도 입력하지 않았습니다');
    return false;
  }
  else if (myMoney < battingMoney) {
    alert('배팅 금액이 자금보다 높습니다');
    return false;
  }
  numList.push(number);
  if (numList.length > 10){
    numList.shift();
  }
  genealogyEl.innerHTML = "족보 : " + numList;
  numberEl.innerHTML = number;
  return true;
}
let oddNumEl = document.querySelector('.oddNum');
let evenNumEl = document.querySelector('.evenNum');
let upNumEl = document.querySelector('.upNum');
let downNumEl = document.querySelector('.downNum');
let btn = document.querySelector('.btn');

oddNumEl.addEventListener('click', () => {
  if (randomNumber()){
    if (number % 2 != 0) {
      myMoney += battingMoney * 0.98;
      alert('축하합니다: ' + number + "가 나왔습니다!");
      moneyEl.innerHTML = "현재 자금 : " +myMoney;
    }
    else {
      myMoney -= battingMoney;
      alert('아쉽네요: ' + number + '가 나왔습니다');
      moneyEl.innerHTML = "현재 자금 : " +myMoney;
    }
  }
});
evenNumEl.addEventListener('click', () => {
  if (randomNumber()){
    if (number % 2 == 0) {
      myMoney += battingMoney * 0.98;
      alert('축하합니다: ' + number + "가 나왔습니다!");
      moneyEl.innerHTML = "현재 자금 : " +myMoney;
    }
    else {
      myMoney -= battingMoney;
      alert('아쉽네요: ' + number + '가 나왔습니다');
      moneyEl.innerHTML = "현재 자금 : " +myMoney;
    }
  }
});
upNumEl.addEventListener('click', () => {
  if (randomNumber()){
    if (number > 5) {
      myMoney += battingMoney * 0.98;
      alert('축하합니다: ' + number + "가 나왔습니다!");
      moneyEl.innerHTML = "현재 자금 : " +myMoney;
    }
    else {
      myMoney -= battingMoney;
      alert('아쉽네요: ' + number + '가 나왔습니다');
      moneyEl.innerHTML = "현재 자금 : " +myMoney;
    }
  }
});
downNumEl.addEventListener('click', () => {
  if (randomNumber()){
    if (number < 6) {
      myMoney += battingMoney * 0.98;
      alert('축하합니다: ' + number + "가 나왔습니다!");
      moneyEl.innerHTML = "현재 자금 : " +myMoney;
    }
    else {
      myMoney -= battingMoney;
      alert('아쉽네요: ' + number + '가 나왔습니다');
      moneyEl.innerHTML = "현재 자금 : " +myMoney;
    }
  }
});

btn.addEventListener('click', () => {
  number = Math.floor(Math.random() * 10+1);
  numList.push(number);
  genealogyEl.innerHTML = "족보 : " + numList;
  numberEl.innerHTML = number;
});