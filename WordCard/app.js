// Запрет перезагрузки
// window.onbeforeunload = function() {
//   return "";
// }

/////////////////////////////////////////////////////////////////////////////////
// Получение данных по Имени из куки
function getСookie (cookieName)
{
  var results = document.cookie.match ( '(^|;) ?' + cookieName + '=([^;]*)(;|$)' );
  if ( results )
  return ( unescape ( results[2] ) );
  else
  return null;
}
// Удалить куки
var cookieDate= new Date();
cookieDate.setTime(cookieDate.getTime() - 1);
// document.cookie = "counterArray" + "=; expires=" + cookieDate.toGMTString();

/////////////////////////////////////////////////////////////////////////////////
if (isNaN(getСookie("counterTrue")) || getСookie("counterTrue") == null) {document.cookie = "counterTrue = 0"};
if (isNaN(getСookie("counterFalse")) || getСookie("counterFalse") == null) {document.cookie = "counterFalse = 0"};
if (getСookie("structureArray") == null) {document.cookie = "structureArray = 0"};
if (getСookie("counterArray") == null) {document.cookie = "counterArray = -1"};
if (getСookie("modeState") == null) {document.cookie = "modeState = 0"};

console.log(document.cookie);

var buttonHeight = 40, //Высота Кнопок
    counterTrue = parseInt(getСookie("counterTrue")), //Счётчик ответов Верно
    counterFalse = parseInt(getСookie("counterFalse")), //Счётчик ответов Неверно
    modeState = parseInt(getСookie("modeState")), //Состояние переключателя режима
    structureArray = getСookie("structureArray").split(",").map(Number), //Массив со структурой
    counterArray = getСookie("counterArray").split(",").map(Number), //Массив удалённых элементов
    element, //Элемент массива, выбранный рандомно
    appDictionary = [], //Массив состоящий из активных словарей
    appDictionaryLength = 0,
    addCard = card, //Образец новой карточки HTML
    newCard = {}, //Новая карточка, объект для добавления
    addDictionary = dictionarySample, //Образец нового словаря HTML
    settingState = 0; //Состояние поля настроек открыто/закрыто

// Удаляем всё из Контейнера
container.removeChild(container.children[0]);
dictionarysField.removeChild(dictionarysField.children[0]);

// Устанавливаем состояние Режима
if(modeState == 0) {
  btnEngRus.className = 'button active';
  btnRusEng.className = 'button';
} else {
  btnEngRus.className = 'button';
  btnRusEng.className = 'button active';
}

// Создаём список словарей
for (var i = 0; i < dictionary.length; i++) {
  !function(){
    var newDictionary = addDictionary.cloneNode(true);
        newDictionary.id = i;
        newDictionary.children[1].children[0].innerHTML = dictionary[i].name;

        var transcription = 0;
        for (var n = 0; n < dictionary[i].dictionary.length; n++) {
          if (dictionary[i].dictionary[n][2] != undefined) {
            transcription++
          }
        }
        transcription = Math.round(transcription / dictionary[i].dictionary.length * 100);

        newDictionary.children[1].children[1].innerHTML = `Элементов: ${dictionary[i].dictionary.length}; Транскрипция: ${transcription}%`

        newDictionary.onclick = function(){
          if (newDictionary.className == "dictionaries") {
            newDictionary.className = "dictionaries active"
            structureArray[this.id] = 1;
          } else {
            newDictionary.className = "dictionaries"
            structureArray[this.id] = 0;
          }
        }
    dictionarysField.appendChild(newDictionary);
  }();
}

// Создаём массив со структурой
if (Math.max.apply(null, structureArray) == 0) {
  structureArray = [];
  for (var i = 0; i < dictionary.length; i++) {
    structureArray.push(0)
  }
  structureArray[0] = 1;
  document.cookie = `structureArray = ${structureArray}`;
}
// Создаём словарь на основании массива структуры
addDictionarys();

function addDictionarys() {
  appDictionary = [];
  for (var i = 0; i < structureArray.length; i++) {
    if(structureArray[i] == 1){
      appDictionary = appDictionary.concat(dictionary[i].dictionary);
      dictionarysField.children[i].className = "dictionaries active";
    }
  }
  appDictionaryLength = appDictionary.length;
  // Удаляем из массива пройденные элементы
  if (counterArray[0] == -1) {
    counterArray.splice(0,1)
  }
  for (var i = 0; i < counterArray.length; i++) {
    appDictionary.splice(counterArray[i],1);
  }
}

//////////////////////////////////////////////////////////////////////////////////
// Функция генерации карточки
init();
function init(){
  newCard = addCard.cloneNode(true);

  container.insertBefore(newCard, container.children[0]);

  if (appDictionary.length == 0) {
    alert("Весь словарь пройден! Начать заново");
    counterArray = [-1];
    counterTrue = 0;
    counterFalse = 0;
    document.cookie = `counterTrue = ${counterTrue}`
    document.cookie = `counterFalse = ${counterFalse}`
    document.cookie = `counterArray = ${counterArray}`
    // if (structureArray.reduce((accumulator, currentValue) => accumulator + currentValue) == 0) {
    if (Math.max.apply(null, structureArray) == 0) {
      structureArray[0] = 1;
    }
    addDictionarys()
  }
  element = parseInt(Math.random() * appDictionary.length);
  var transcription = appDictionary[element][2];
  if (appDictionary[element][2] == undefined) {
    transcription = ''
  }

  if (modeState == 0) {
    word.children[1].appendChild(document.createTextNode(`${appDictionary[element][0]}`));
    word.children[2].appendChild(document.createTextNode(`${transcription}`));
    // translation.children[1].appendChild(document.createTextNode(`${appDictionary[element][1]}`));
    translation.children[1].innerHTML = `${appDictionary[element][1]}`
  } else {
    word.children[1].appendChild(document.createTextNode(`${appDictionary[element][1]}`));
    translation.children[1].appendChild(document.createTextNode(`${appDictionary[element][0]}`));
  }

  btnShow.style.height = `${buttonHeight}px`;

  // translation.children[1].style.opacity = "0";
  btnShow.style.marginTop = "0";
  btnShow.style.opacity = "1";
  btnTrue.style.height = "0";
  btnFalse.style.height = "0";
  btnShow.addEventListener("click", btnShowEvent);
  btnTrue.addEventListener("click", btnTrueEvent);
  btnFalse.addEventListener("click", btnFalseEvent);
  setTimeout(function(){
    card.style.opacity = "1";
    card.style.transform = "scaleY(1)"
  }, 300)

  progressBar.style.width = `${100 - parseInt(appDictionary.length/appDictionaryLength * 100)}%`;
  progressBar.innerHTML = `${100 - parseInt(appDictionary.length/appDictionaryLength * 100)}%`;
  progress.innerHTML = `${appDictionaryLength - appDictionary.length}/${appDictionaryLength}`

  answerTrue.style.width = `${parseInt(100 * counterTrue / (counterTrue + counterFalse))}%`;
  answerFalse.style.width = `${100 - parseInt(100 * counterTrue / (counterTrue + counterFalse))}%`;

  if (isNaN(parseInt(100 * counterTrue / (counterTrue + counterFalse)))) {
    answerTrue.style.width = "0";
    answerFalse.style.width = "0";
  }

  answerTrue.innerHTML = `${Math.round(100 * counterTrue / (counterTrue + counterFalse + .001))}%`;
  answerFalse.innerHTML = `${100 - Math.round(100 * counterTrue / (counterTrue + counterFalse + .001))}%`;
}
//////////////////////////////////////////////////////////////////////////////////
// События

function btnShowEvent(){
  translation.children[1].style.opacity = "1";
  btnShow.style.height = "0";
  btnShow.style.opacity = "0";
  btnShow.style.marginTop = "-12px";
  btnTrue.style.height = `${buttonHeight}px`;
  btnTrue.style.display = "block";
  btnFalse.style.height = `${buttonHeight}px`;
  btnFalse.style.display = "block";
}

function btnTrueEvent(){
  appDictionary.splice(element,1);
  counterArray.push(element)
  counterTrue++;
  document.cookie = `counterTrue = ${counterTrue}`
  document.cookie = `counterArray = ${counterArray}`
  remove();
}

function btnFalseEvent(){
  counterFalse++
  document.cookie = `counterFalse = ${counterFalse}`
  remove();
}

function remove(){
  card.id = "cardOld";
  text.id = "";
  word.id = "";
  translation.id = "";
  control.id = "";
  btnShow.id = "";
  btnTrue.id = "";
  btnFalse.id = "";
  cardOld.style.transform = "scaleY(0)";
  cardOld.style.opacity = "0";
  cardOld.style.marginLeft = "-50%";
  init();
  // setTimeout(init, 0);
  setTimeout(function(){
    while (container.children.length > 1) {
      container.removeChild(container.children[1])
    }
  }, 300);
}

// Панель настроек
btnShowSettings.onclick = function(){
  if (settingState == 0) {
    showSetting();
  } else {
    closeSetting();
  }
}

btnEngRus.onclick = function() {
  modeState = 0;
  btnEngRus.className = 'button active';
  btnRusEng.className = 'button';
}
btnRusEng.onclick = function() {
  modeState = 1;
  btnEngRus.className = 'button';
  btnRusEng.className = 'button active';
}

btnConfirm.onclick = function(){
  closeSetting();
  counterTrue = 0;
  counterFalse = 0;
  counterArray = [-1];
  document.cookie = `counterTrue = ${counterTrue}`
  document.cookie = `counterFalse = ${counterFalse}`
  document.cookie = `structureArray = ${structureArray}`
  document.cookie = `counterArray = ${counterArray}`
  document.cookie = `modeState = ${modeState}`
  addDictionarys();
  remove();
}

function showSetting() {
  settingsField.style.transform = "scaleY(1)";
  settingsField.style.opacity = "1";
  settingState = 1;
  btnShowSettings.children[0].style.transform = "rotate(-180deg)";
  stat.style.opacity = ".15"
  container.style.opacity = ".15"
}
function closeSetting() {
  settingsField.style.transform = "scaleY(0)";
  settingsField.style.opacity = "0";
  btnShowSettings.children[0].style.transform = "rotate(0deg)";
  settingState = 0;
  stat.style.opacity = "1"
  container.style.opacity = "1"
}


!function(){
  var table = document.createElement("table");
  table.style.paddingTop = "200px"
  container.appendChild(table);

  for (var i = 0; i < dictionary[3].dictionary.length; i++) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.innerHTML = `${dictionary[3].dictionary[i][0]}`;
    var td2 = document.createElement("td");
    td2.innerHTML = `${dictionary[3].dictionary[i][1]}`;

    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
  }
}
