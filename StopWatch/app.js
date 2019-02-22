// Запрет спящего режима
var noSleep =  new NoSleep (),
    timerNS;

function enableNoSleep() {
  noSleep.enable();
	setTimeout(function(){noSleep.disable();}, 100);
  timerNS = setTimeout(enableNoSleep, 15000);
};
// DOM to Image



//=========
// Запрет перезагрузки
// window.onbeforeunload = function() {
//   return "";
// }

var minute = 0,
    second = 0,
    pauseMinute = 0,
    pauseSecond = 0,
    lastTime = 0,
    time = `${minute}:${second}`,
    timerId,
    timer = 0,
    status = 0,
    round = 0,
    _distance = 0,
    delay = 10,
    roundTime = [],
    counterDelay = 0,
    addRoundInfo = newRoundInfo;



var dd = new Date().getDate(),
    mm = new Date().getMonth() + 1,
    yyyy = new Date().getFullYear();
if (mm < 10) {
  mm = '0' + mm;
}
date.innerHTML = `${dd}.${mm}.${yyyy}`;

roundsInfo.removeChild(roundsInfo.children[0]);

function stopWatch(){
  counterDelay++;
  // Вычисляем время от точки отсчёта (2)
  second = pauseMinute * 60 + pauseSecond + parseInt((new Date().getTime()-timer)/1000) - minute * 60;
  while (second >= 60) {
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
  if (counterDelay > delay) {
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
  header.style.transform = "translateY(-100%)";
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
  header.style.transform = "translateY(0)";
};

btnClear.onclick = function(){
  minute = 0;
  pauseMinute = 0;
  second = 0;
  pauseSecond = 0;
  timer = 0;
  status = 0;
  round = 0;
  lastTime = 0;
  _distance = 0;
  counterDelay = 0;
  roundTime = [];

  btnStart.className = "button w50 enable";
  btnClear.className = "button disable";
  watch.children[0].innerHTML = '00:00';
  rounds.innerHTML = '0';
  totalDistance.innerHTML = '0';

  while (roundsInfo.children.length > 0) {
    roundsInfo.removeChild(roundsInfo.firstChild);
  }
};

btnRound.onclick = function(){
  if (counterDelay >= delay) {
    round++;
    rounds.innerHTML = round;
    _distance = _distance + parseInt(distance.value)

    totalDistance.innerHTML = _distance;

    var _second = minute * 60 + second - lastTime,
        _minute = 0;

    lastTime = lastTime + _second;
    while (_second >= 60) {
      _second = _second - 60;
      _minute++;
    }

    if (_minute < 10) {
      _minute = `0${_minute}`
    }
    if (_second < 10) {
      _second = `0${_second}`
    }

    var roundInfo = {};
        roundInfo = addRoundInfo.cloneNode(true);
        roundInfo.id = '';
        roundInfo.children[0].innerHTML = `Круг: ${round}`;
        roundInfo.children[1].children[0].children[0].innerHTML = `${_minute}:${_second}`
        roundsInfo.appendChild(roundInfo);

    setTimeout(function(){
      roundInfo.style.transform = "scaleY(1)";
      roundInfo.style.opacity = "1";
    }, 0)

    btnRound.className = "btnRound button inactive";

    roundTime.push(parseInt(_second) + parseInt(_minute) * 60)

    for (var i = 0; i < roundTime.length; i++) {
      roundsInfo.children[i].children[1].children[0].style.background = "";
      roundsInfo.children[i].children[1].children[0].style.width = `${roundTime[i] / Math.max.apply(null, roundTime) * 100}%`;
      if (roundTime[i] == Math.max.apply(null, roundTime)) {
        roundsInfo.children[i].children[1].children[0].style.background = "#ff5252";
      }
      if (roundTime[i] == Math.min.apply(null, roundTime)) {
        roundsInfo.children[i].children[1].children[0].style.background = "#4caf50";
      }
    }
    counterDelay = 0;
  }
};

// === ===
