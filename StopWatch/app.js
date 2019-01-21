// Запрет спящего режима
var noSleep =  new NoSleep (),
    timerNS;

function enableNoSleep() {
  noSleep.enable();
	setTimeout(function(){noSleep.disable();}, 100);
  timerNS = setTimeout(enableNoSleep, 30000);
};
//=========
// Запрет перезагрузки
// window.onbeforeunload = function() {
//   return "";
// }

var minute = 0,
    pauseMinute = 0,
    second = 0,
    pauseSecond = 0,
    time = `${minute}:${second}`,
    timerId,
    timer = 0,
    status = 0,
    round = 0,
    _distance = 0,
    delay = 10;

var roundTime = {
    second: 0,
    minute: 0,
    time: function(){
        while (this.second > 60) {
          this.second = this.second - 60;
          this.minute++;
        }

        var _minute = this.minute,
        _second = this.second;

        if (this.minute < 10) {
          _minute = `0${this.minute}`
        }
        if (this.second < 10) {
          _second = `0${this.second}`
        }
       return `${_minute}:${_second}`;
     },
    }

console.log(roundTime.time());

function stopWatch(){
  // Вычисляем время от точки отсчёта (2)
  second = pauseMinute * 60 + pauseSecond + parseInt((new Date().getTime()-timer)/1000) - minute * 60;
  roundTime.second++;
  if (second == 60) {
    second = second - 60;
    minute++;
  }
  if (minute < 10) {
    vminute = `0${minute}`
  } else {
    vminute = `${minute}`
  }
  if (second < 10) {
    vsecond = `0${second}`
  } else {
    vsecond = `${second}`
  }
  time = `${vminute}:${vsecond}`
  watch.children[0].innerHTML = time;

  if (status == 1) {
    timerId = setTimeout(stopWatch, 1000)
  }
  if (roundTime.second > delay) {
    btnRound.className = "btnRound button";
  } else {
    btnRound.className = "btnRound button inactive";
  }
}

// === События ===
btnStart.onclick = function(){
  timer = new Date().getTime(); // Создаём точку отсчёта (1)
  status = 1;
  clearTimeout(timerId);
  stopWatch();
  enableNoSleep();
  btnStart.className = "button disable";
  btnClear.className = "button disable";
  btnPause.className = "button w50 enable";
};

btnPause.onclick = function(){
  status = 0;
  pauseSecond = second,
  pauseMinute = minute,
  clearTimeout(timerId);
  noSleep.disable();
  clearTimeout(timerNS);
  btnStart.className = "button w25 enable";
  btnClear.className = "button w25 enable";
  btnPause.className = "button disable";
};

btnClear.onclick = function(){
  minute = 0;
  pauseMinute = 0;
  second = 0;
  pauseSecond = 0;
  timer = 0;
  status = 0;
  round = 0;
  roundTime.second = 0;
  roundTime.minute = 0;
  _distance = 0;

  btnStart.className = "button w50 enable";
  btnClear.className = "button disable";
  watch.children[0].innerHTML = '00:00';
  rounds.innerHTML = '0';
  totalDistance.innerHTML = '0';

};

btnRound.addEventListener('click', function(){
  if (roundTime.second >= delay) {
    round++;
    rounds.innerHTML = round;
    _distance = _distance + parseInt(distance.value)

    totalDistance.innerHTML = _distance;

    var roundInfo = document.createElement('div');
    roundInfo.className = "roundInfo";
    roundInfo.appendChild(document.createTextNode(`Круг: ${round}, Время круга: ${roundTime.time()}`));
    roundsInfo.appendChild(roundInfo);
    roundTime.second = 0;
    roundTime.minute = 0;
    btnRound.className = "btnRound button inactive";
  }
});

// === ===
