periodSettings.addEventListener('click', go);
window.addEventListener("keyup", go);

var goal1 = [25, 25, 25, 25, 25],
    goal2 = [25, 25, 25, 25, 25],
    goal3 = [25, 25, 25, 25, 25],
    priv  = [0, 0, 0, 0, 0];


var goal1_Day = [1, 1, 1, 1, 1],
    goal2_Day = [1, 1, 0, 1, 0],
    goal3_Day = [0, 1, 1, 1, 0],
    priv_Day  = [1, 1, 1, 1, 1];

var goal1_Motiv = _goal1_Motiv.value,
    goal2_Motiv = _goal2_Motiv.value,
    goal3_Motiv = _goal3_Motiv.value;

go();

function go() {

  goal1_Motiv = _goal1_Motiv.value;
  goal2_Motiv = _goal2_Motiv.value;
  goal3_Motiv = _goal3_Motiv.value;
  priv_Motiv  = 100 - goal1_Motiv - goal2_Motiv - goal3_Motiv;

  settings.children[3].children[1].innerHTML = `${priv_Motiv}%`

  for (var i = 0; i < 5; i++) {
    goal1[i] = goal1_Day[i] * goal1_Motiv * 500 / summArray(goal1_Day) / 100;
    goal2[i] = goal2_Day[i] * goal2_Motiv * 500 / summArray(goal2_Day) / 100;
    goal3[i] = goal3_Day[i] * goal3_Motiv * 500 / summArray(goal3_Day) / 100;
  }

  for (var i = 0; i < priv.length; i++) {
    priv[i] = 100 - goal1[i] - goal2[i] - goal3[i];
    if (priv[i] < 0) {
      priv[i] = 0;
    }
  }

  for (var i = 0; i < 5; i++) {
    before.children[i].children[0].style.height = `${goal1[i]}%`;
    before.children[i].children[0].innerHTML = `${parseInt(goal1[i])}`;
    before.children[i].children[1].style.height = `${goal2[i]}%`;
    before.children[i].children[1].innerHTML = `${parseInt(goal2[i])}`;
    before.children[i].children[2].style.height = `${goal3[i]}%`;
    before.children[i].children[2].innerHTML = `${parseInt(goal3[i])}`;
    before.children[i].children[3].style.height = `${priv[i]}%`;
    before.children[i].children[3].innerHTML = `${parseInt(priv[i])}`;
  }
  // balance()
}

function summArray(array){
  var summ = 0
  for (var i = 0; i < goal1.length; i++) {
    summ = summ + array[i];
  }
  return summ;
}
// ===========================================
// Поле с настройками периода
// ===========================================

for (var i = 0; i < 15; i++) {
  var block = document.createElement('div');
  // block.innerHTML = 0;
  block.id = `${i}`

  if (i < 5) {
    block.innerHTML = goal1_Day[i];
  }
  if (i >= 5 && i < 10) {
    block.innerHTML = goal2_Day[i - 5];
  }
  if (i >= 10) {
    block.innerHTML = goal3_Day[i - 10]
  }
  if (block.innerHTML == 1) {
    block.style.background = "black"
    block.style.color = "white"
  } else {
    block.style.background = "white"
  }

  block.onclick = function(){
    if (this.innerHTML == "0") {
      this.innerHTML = 1;
      this.style.background = "black";
      this.style.color = "white";
      if (this.id < 5) {
        goal1_Day[this.id] = 1;
      }
      if (this.id > 5 || this.id < 10) {
        goal2_Day[this.id - 5] = 1;
      }
      if (this.id > 10 || this.id < 15) {
      goal3_Day[this.id - 10] = 1;
      }

    } else {
      this.innerHTML = 0;
      this.style.background = "white";
      this.style.color = "black";
      if (this.id < 5) {
        goal1_Day[this.id] = 0;
      }
      if (this.id > 5 || this.id < 10) {
        goal2_Day[this.id - 5] = 0;
      }
      if (this.id > 10 || this.id < 15) {
      goal3_Day[this.id - 10] = 0;
      }
    }
  }
  periodSettings.appendChild(block)
}

// ===========================================
// БАЛАНСИРОВКА
// ===========================================

buttonBalance.onclick = balance;
function balance(){
  var counter = 0;
  while (counter < 100) {
    counter++

    var check = 0,
    correction = 0;

    var _goal1 = goal1,
    _goal2 = goal2,
    _goal3 = goal3;

    for (var i = 0; i < 5; i++) {
      check = goal1[i] + goal2[i] + goal3[i];
      if (check > 100) {
        correction = (check - 100) / 100
        _goal1[i] = parseInt(_goal1[i] - _goal1[i] * correction / 3);
        _goal2[i] = parseInt(_goal2[i] - _goal2[i] * correction / 3 );
        _goal3[i] = parseInt(_goal3[i] - _goal3[i] * correction / 3);

        for (var n = 0; n < 5; n++) {
          if (goal1_Day[n] == 1) {
            goal1[n] = (_goal1[n] / summArray(_goal1) * 500 * goal1_Motiv / 100);
          }
          if (goal2_Day[n] == 1) {
            goal2[n] = (_goal2[n] / summArray(_goal2) * 500 * goal2_Motiv / 100);
          }
          if (goal3_Day[n] == 1) {
            goal3[n] = (_goal3[n] / summArray(_goal3) * 500 * goal3_Motiv / 100);
          }
        }

        console.log(summArray(goal1) + summArray(goal2) + summArray(goal3) + summArray(priv));
        console.log(`Goal1: ${summArray(goal1)} - ${summArray(goal1)/500 * 100}%`);
        console.log(`Goal3: ${summArray(goal2)} - ${summArray(goal2)/500 * 100}%`);
        console.log(`Goal3: ${summArray(goal3)} - ${summArray(goal3)/500 * 100}%`);
        console.log(`Privat: ${summArray(priv)} - ${summArray(priv)/500 * 100}%`);
        console.log(counter);


        for (var m = 0; m < 5; m++) {
          priv[m] = 100 - goal1[m] - goal2[m] - goal3[m];

          before.children[m].children[0].style.height = `${goal1[m]}%`;
          before.children[m].children[0].innerHTML = `${parseInt(goal1[m])}`;
          before.children[m].children[1].style.height = `${goal2[m]}%`;
          before.children[m].children[1].innerHTML = `${parseInt(goal2[m])}`;
          before.children[m].children[2].style.height = `${goal3[m]}%`;
          before.children[m].children[2].innerHTML = `${parseInt(goal3[m])}`;
          before.children[m].children[3].style.height = `${priv[m]}%`;
          before.children[m].children[3].innerHTML = `${parseInt(priv[m])}`;
        }
      }
    }
  }
}
