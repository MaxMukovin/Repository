// Запрет спящего режима
var noSleep =  new  NoSleep (),
    timerNS;

function enableNoSleep() {
  noSleep.enable();
	setTimeout(function(){noSleep.disable();}, 100);
  timerNS = setTimeout(enableNoSleep, 30000);
};
//

var minute = 0,
    second = 0,
    time = `${minute}:${second}`,
    timerId,
    status = 0,
    round = 0,
    _distance = 0;

function stopWatch(){
  second++
  if (second == 60) {
    second = 0;
    minute++
  }

  time = `${minute}:${second}`
  watch.innerHTML = time;

  if (status == 1) {
    timerId = setTimeout(stopWatch, 1000)
  }
}

// === События ===
btnStart.addEventListener('click', function(){
  status = 1; clearTimeout(timerId); stopWatch();
  enableNoSleep()
});

btnStop.addEventListener('click', function(){
  status = 0; clearTimeout(timerId);
  noSleep.disable();
  clearTimeout(timerNS);
});

btnRound.addEventListener('click', function(){
  round++;
  rounds.innerHTML = round;
  _distance = _distance + parseInt(distance.value)
  console.log(distance.value);

  totalDistance.innerHTML = _distance;

  var roundInfo = document.createElement('div');
  roundInfo.className = "roundInfo";
  roundInfo.appendChild(document.createTextNode(`Круг:${round}, Время:${time}`));
  roundsInfo.appendChild(roundInfo);
});

// === ===
