var hor = 5,
    ver = 5;

// Создали матрицу с минами
var nullArr = generateMatrix();
console.log(nullArr);
var mineArr = addMines(nullArr)

//Генерирует пустую матрицу
function generateMatrix() {
  var arr = [],
      array = [];
  for (var i = 0; i < hor; i++) {
    array.push(0)
  }
  for (var i = 0; i < ver; i++) {
    arr.push(array)
  }
return arr
}

// Наполняем массив минами
function addMines(arr) {
  var x = hor,
      y = ver;

// Создали массив со случайными минами
  var array = []

  for (var i = 0; i < x * y; i++) {
    array.push(0)
  }
  var array = addElements(array)
// ===================================

  // var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

  var arr =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ];

// console.log(arr);

  var str = 0,
      st = 0;
  for (var i = 0; i < array.length; i++) {
    if (i % 5 == 0 && i > 2) {
      str++;
      st = 0;
    }
    arr[str][st] = array[i];
    st++;
  }
  return arr;
}

// создаём родительский блок
var parrentBox = document.createElement("div");
parrentBox.style.width = `${50 * hor + 20}px`;
parrentBox.style.background = "red";
parrentBox.style.margin = "auto";
parrentBox.style.marginTop = "50px";
document.body.appendChild(parrentBox);

// наполняет поле
var str = 0,
      i = 0;
while (str < hor) {
  if (i == hor) {
    i = 0;
    str++;
  }
  if (i < ver && str < hor) {
    box(i, 50, str, i);
    i++;
  }
}

//Строит квадрат
function box(id, size, str, st) {
  var box = document.createElement("div");
  var text = mineArr[str][st]
  // box.id = id;
  box.style.width = `${size}px`;
  box.style.height = `${size}px`;
  box.style.background = "#666";
  box.style.border = "1px solid #555";
  box.style.textAlign = "center";
  box.style.lineHeight = `${size}px`;
  box.style.float = "left";
  box.style.transition = "all 0.3s";
  box.style.fontSize = "0px";
  box.style.fontFamily = "verdana";
  box.style.color = "#249";

  switch (text) {
    case 1:
            // box.style.background = "red";
            text = "mine"
            break;
    case 0:
            // box.style.background = "yellow";
              text = sum(str, st);

            break;
  }
  parrentBox.appendChild(box);
  box.addEventListener("click", boxClick  );
  box.addEventListener("contextmenu", boxClickR);
  box.appendChild(document.createTextNode(text));
}

// Нажатие на левую кнопку
function boxClick(text) {
  this.style.background = "#999";
  this.style.fontSize = "13px";
  if (text == 1) {
    // this.style.background = "red";

  }
}

// Нажатие на правую кнопку
function boxClickR () {
  this.style.background = "#222";
}

// Считает все элементы вокруг заданной ячейки
function sum(str, st){
  var summa = pr(str - 1, st - 1)+
              pr(str - 1, st)+
              pr(str - 1, st + 1)+
              pr(str, st - 1)+
              pr(str, st + 1)+
              pr(str + 1, st - 1)+
              pr(str + 1, st)+
              pr(str + 1, st + 1)
  return summa
}

// Проверяет, существует ли данный элемент матрицы, если нет - выдаёт 0, если да - содержимое из матрицы
function pr(str, st) {
  if (str < 0 || str > hor - 1 || st < 0 || st > ver - 1) {
    return 0
  }
  return mineArr[str][st]
}

// Складывает все элементы массива
function summa(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i]
  }
  return sum;
}

// Берёт массив и кладёт туда заданное количество мин
function addElements(array){

  while (summa(array) < 5) {
    var rnd = Math.floor(Math.random() * array.length)
    array[rnd] = 1;
  }
  return array;
}
