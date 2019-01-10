FieldX.value = '10'
FieldY.value = '10'
var fieldX = FieldX.value,
    fieldY = FieldY.value,
    size = parrentBox.offsetWidth / fieldX,
    click = 0,
    mine = Math.round(.2 * (fieldX * fieldY)),
    id = 0,
    array = [],
    summArray = [];
    parrentBox.oncontextmenu = function (){return false};
    parrentBox.onselectstart = function (){return false};

// Запускает приложение
init()

function init() {

  if (innerWidth < innerHeight) {
    container.style.width = `${innerWidth}px`;
    size = innerWidth / fieldX;
  }

  while (parrentBox.children.length != 0) {
      parrentBox.removeChild(parrentBox.firstChild)
  };
    fieldX = FieldX.value;
    fieldY = FieldY.value;
    size = parrentBox.offsetWidth / fieldX - 1;
    click = 0;
    mine = Math.round(.2 * (fieldX * fieldY));
    id = 0;
    array = [];
    summArray = [];
    parrentBox.oncontextmenu = function (){return false};
    parrentBox.onselectstart = function (){return false};

  // Создали массив с 0
  for (var i = 0; i < fieldX * fieldY; i++) {
    array.push(0)
  }
  // Построили поле
  for (var i = 0; i < array.length; i++) {
    box()
  }
}

//============================STOP================================
//================================================================
// -- Функции ---

// // Создаём массив с минами
function mineArray(exception){
  while (arraySum(array) < mine) {
    var rnd = Math.floor(Math.random() * array.length)
    array[rnd] = 1;
    array[exception] = 0;
  }
// Создаём пустую матрицу
  function NullMatrix() {
    var nullMatrix = new Array();
    for (var i = 0; i < fieldY; i++){
      nullMatrix[i] = new Array();
      for(var j = 0; j < fieldX; j++){
        nullMatrix[i][j] = null;
      }
    }
    return nullMatrix
  }
  var nullMatrix = new NullMatrix
// Заполняем матрицу минами
  var str = 0,
      st = 0,
      matrix = new NullMatrix;
  for (var i = 0; i < array.length; i++) {
    matrix[str][st] = array[i];
    st++;
    if (st == fieldX) {
      str++;
      st = 0;
    }
  }
  // Считаем сумму соседних элементов
  var sumMatrix = new NullMatrix;
  var str = 0,
      st = 0;
  for (var i = 0; i < array.length; i++) {
    sumMatrix[str][st] = summ(str, st);
    st++;
    if (st == fieldX) {
      str++;
      st = 0;
    }
  }
  // Переводим матрицу с суммами в вектор
  var str = 0,
      st = 0;
  for (var i = 0; i < array.length; i++) {
    summArray.push(sumMatrix[str][st]);
    st++;
    if (st == fieldX) {
      st = 0;
      str++;
    }
  }
  function summ(str, st) {
    var summ = cheсk(str - 1, st - 1)+
                cheсk(str - 1, st)+
                cheсk(str - 1, st + 1)+
                cheсk(str, st - 1)+
                cheсk(str, st + 1)+
                cheсk(str + 1, st - 1)+
                cheсk(str + 1, st)+
                cheсk(str + 1, st + 1)
    return summ;
  }

  function cheсk(str, st) {
    if (str < 0 || str > fieldY - 1 || st < 0 || st > fieldX - 1) {
      return 0;
    } else {
      return matrix[str][st];
    }
  }
}

//Строит квадрат
function box() {
  // var text = array[id];
  var text = "";
  var box = document.createElement("div");
      box.id = id;
      box.style.width = `${size - 1}px`;
      box.style.height = `${size - 1}px`;
      box.style.backgroundColor = "inherit";
      box.style.border = "1px solid #555";
      box.style.textAlign = "center";
      box.style.lineHeight = `${size}px`;
      box.style.float = "left";
      box.style.transition = "all 0.3s";
      box.style.fontSize = `${size * .4}px`;
      box.style.fontFamily = "verdana";
      box.style.color = "#249";
      box.style.cursor = "pointer";

  parrentBox.appendChild(box);
  box.appendChild(document.createTextNode(text));
  box.addEventListener("click", boxClick);
  box.addEventListener("contextmenu", boxClickR);
  id++
}

// Складывает все элементы массива
function arraySum() {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i]
  }
  return sum;
}


//============================================================
// ---Функции Событий---

// Нажатие на левую кнопку
function boxClick() {
  if (click == 0) {
    mineArray(this.id)
  }
  this.style.background = "#999";
  this.style.backgroundSize = `${0.7 * size}px`;

  switch (array[this.id]) {
    case 1:
            this.style.backgroundRepeat = "no-repeat";
            this.style.backgroundPosition = "center center";
            this.style.backgroundImage = "url(img/mine.png)";
            setTimeout(function(){alert("Мина! Но ничего страшного, приложение ещё не способно прервать игру, \
так что, можешь продолжить)")}, 300);
            text = ""
            break;
    case 0:
            this.innerHTML = summArray[this.id];
            if (summArray[this.id] == 0) {

            }
            break;
  }
  click++
}
// Нажатие на правую кнопку
function boxClickR () {
  this.style.background = "#666";
  this.innerHTML = "";
  this.style.backgroundSize = `${0.5 * size}px`;
  this.style.backgroundRepeat = "no-repeat";
  this.style.backgroundPosition = "center center";
  this.style.backgroundImage = "url(img/flag.png)";
}
//============================================================
// ---События---
confirm = document.getElementById("confirm")
confirm.addEventListener("click", init);




window.addEventListener("keydown", function(index) {
  if (index.keyCode == 13) {
    init()
  }
})











//============================================================
