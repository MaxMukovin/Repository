// Запрет спящего режима
// var noSleep =  new  NoSleep ();
// document.addEventListener('click', function enableNoSleep() {
//   document.removeEventListener('click', enableNoSleep, false);
//   noSleep.enable();
// }, false);
// === ===

var minute = 0,
    second = 0,
    time = `${minute}:${second}`,
    timerId,
    round = 0,
    status = 0;

function timerFn(){
  second++
  if (second == 60) {
    second = 0;
    minute++
  }

  time = `${minute}:${second}`
  // console.log(time);
  timerKpi.innerHTML = time;

  if (status == 1) {
    timerId = setTimeout(timerFn, 1000)
  }
}

// === События ===
btnStart.addEventListener('click', function(){
  status = 1; clearTimeout(timerId); timerFn();
});

btnStop.addEventListener('click', function(){
  status = 0; clearTimeout(timerId);
});

btnRound.addEventListener('click', function(){
  round++;
  roundKpi.innerHTML = round;

  var row = document.createElement('div');
  row.appendChild(document.createTextNode(`Круг:${round}, Время:${time}`));
  document.body.appendChild(row);
});
// === ===
