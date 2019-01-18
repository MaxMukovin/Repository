// Запрет спящего режима
var noSleep =  new  NoSleep (),
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
    second = 0,
    time = `${minute}:${second}`,
    timerId,
    status = 0,
    round = 0,
    lastRound = 0,
    _distance = 0;

function stopWatch(){
  second++
  if (second == 60) {
    second = 0;
    minute++
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
}

// === События ===
btnStart.addEventListener('click', function(){
  status = 1;
  clearTimeout(timerId);
  stopWatch();
  enableNoSleep();
  btnStart.className = "button disable";
  btnStop.className = "button enable";
  btnRound.className = "btnRound button";
});

btnStop.addEventListener('click', function(){
  status = 0;
  clearTimeout(timerId);
  noSleep.disable();
  clearTimeout(timerNS);
  btnStart.className = "button enable";
  btnStop.className = "button disable";
  btnRound.className = "btnRound button inactive";
});

btnRound.addEventListener('click', function(){
  if (status == 1) {
    round++;
    rounds.innerHTML = round;
    _distance = _distance + parseInt(distance.value)

    totalDistance.innerHTML = _distance;

    var roundInfo = document.createElement('div');
    roundInfo.className = "roundInfo";
    roundInfo.appendChild(document.createTextNode(`Круг: ${round}, Время круга: ${time}`));
    roundsInfo.appendChild(roundInfo);
  }
});

// === ===
