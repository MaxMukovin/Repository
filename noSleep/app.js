var noSleep =  new  NoSleep (),
    timerId;

function enableNoSleep() {
  noSleep.enable();
	var date = new Date();
  var check = document.createElement("div");
  check.appendChild(document.createTextNode(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`))
  document.body.appendChild(check)
  setTimeout(function(){noSleep.disable();}, 100);
  timerId = setTimeout(enableNoSleep, 15000);
// 100 20000 работает
// 1 10000 работает
// 1 20000 нет
// 10 20000 работает но на грани срыва
// 100 30000 работает но на грани срыва
};

btnStart.addEventListener('click', enableNoSleep)

btnStop.addEventListener('click', function(){
  noSleep.disable();
  clearTimeout(timerId);
})
