// Запрет перезагрузки
// window.onbeforeunload = function() {
//   return "";
// }

var counterTrue = 0,
    counterFalse = 0,
    buttonHeight = 40,
    element,
    structureArray = [],
    appDictionary = [],
    appDictionaryLength = 0,
    addCard = document.getElementById("card"),
    newCard = {},
    settingState = 0,
    modeState = 0;

// Удаляем всё из Контейнера
while (container.children.length > 0) {
  container.removeChild(container.firstChild)
}

// Создаём массив со структурой
for (var i = 0; i < dictionary.length; i++) {
  structureArray.push(0)
}
structureArray[0] = 1;

// Создаём словарь на основании массива структуры
addDictionary();

function addDictionary() {
  appDictionary = [];
  for (var i = 0; i < structureArray.length; i++) {
    if(structureArray[i] == 1){
      appDictionary = appDictionary.concat(dictionary[i]);
      dictionarysField.children[i].className = "dictionaries active";
    }
  }
  appDictionaryLength = appDictionary.length;
}
//
// Запускаем функцию генерации карточки
init();

// Функция генерации карточки
function init(){
  newCard = addCard.cloneNode(true);
  container.appendChild(newCard);

  if (appDictionary.length == 0) {
    alert("Весь словарь пройден! Начать заново");
    counterTrue = 0;
    counterFalse = 0;
    structureArray[0] = 1;
    addDictionary()
  }
  element = parseInt(Math.random() * appDictionary.length);
  var transcription = appDictionary[element][2];
  if (appDictionary[element][2] == undefined) {
    transcription = ''
  }

  if (modeState == 0) {
    word.children[0].appendChild(document.createTextNode(`${appDictionary[element][0]}`));
    word.children[1].appendChild(document.createTextNode(`${transcription}`));
    translation.appendChild(document.createTextNode(`${appDictionary[element][1]}`));
  } else {
    word.children[0].appendChild(document.createTextNode(`${appDictionary[element][1]}`));
    translation.appendChild(document.createTextNode(`${appDictionary[element][0]}`));
  }

  btnShow.style.height = `${buttonHeight}px`;

  card.style.height = "0";
  card.style.opacity = "0";
  translation.style.opacity = "0";
  btnShow.style.marginTop = "0";
  btnShow.style.opacity = "1";
  btnTrue.style.height = "0";
  btnFalse.style.height = "0";
  btnShow.addEventListener("click", btnShowEvent);
  btnTrue.addEventListener("click", btnTrueEvent);
  btnFalse.addEventListener("click", btnFalseEvent);
  setTimeout(function(){card.style.height = `${buttonHeight + 72}px`; card.style.opacity = "1"}, 300)

  progressBar.style.width = `${100 - parseInt(appDictionary.length/appDictionaryLength * 100)}%`;
  progressBar.innerHTML = `${100 - parseInt(appDictionary.length/appDictionaryLength * 100)}%`;
  progress.innerHTML = `${appDictionaryLength - appDictionary.length}/${appDictionaryLength}`

  answerTrue.style.width = `${(100 * counterTrue / (counterTrue + counterFalse + .001))}%`;
  answerFalse.style.width = `${(100 * counterFalse / (counterTrue + counterFalse + .001))}%`;
  answerTrue.innerHTML = `${Math.round(100 * counterTrue / (counterTrue + counterFalse + .001))}%`;
  answerFalse.innerHTML = `${100 - Math.round(100 * counterTrue / (counterTrue + counterFalse + .001))}%`;
}

// События

function btnShowEvent(){
  translation.style.opacity = "1";
  btnShow.style.height = "0px";
  btnShow.style.opacity = "0";
  btnShow.style.marginTop = "-12px";
  btnTrue.style.height = `${buttonHeight}px`;
  btnTrue.style.display = "block";
  btnFalse.style.height = `${buttonHeight}px`;
  btnFalse.style.display = "block";
}

function btnTrueEvent(){
  appDictionary.splice(element,1);
  counterTrue++;
  remove();
}

function btnFalseEvent(){
  counterFalse++
  remove();
}

function remove(){
  card.id = "cardOld";
  text.id = "textOld";
  word.id = 'wordOld';
  translation.id = "translationOld";
  control.id = "controlOld";
  btnShow.id = "btnShowOld";
  btnTrue.id = "btnTrueOld";
  btnFalse.id = 'btnFalseOld';
  cardOld.style.height = "0";
  cardOld.style.marginLeft = "-100px";
  cardOld.style.opacity = "0";
  setTimeout(init, 0);
  setTimeout(function(){
    while (container.children.length > 1) {
      container.removeChild(container.children[0])
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
  addDictionary();
  counterTrue = 0;
  counterFalse = 0;
  remove();
}

function showSetting() {
  settingsField.style.transform = "scaleY(1)";
  settingsField.style.opacity = "1";
  settingState = 1;
  btnShowSettings.children[0].style.transform = "rotate(-180deg)";
  // stat.style.opacity = ".15"
  container.style.opacity = ".15"
}
function closeSetting() {
  settingsField.style.transform = "scaleY(0)";
  settingsField.style.opacity = "0";
  btnShowSettings.children[0].style.transform = "rotate(0deg)";
  settingState = 0;
  // stat.style.opacity = "1"
  container.style.opacity = "1"
}


dictionary1.onclick = function(){
  if (dictionary1.className == "dictionaries") {
    dictionary1.className = "dictionaries active"
    structureArray[0] = 1;
  } else {
    dictionary1.className = "dictionaries"
    structureArray[0] = 0;
  }
}
dictionary2.onclick = function(){
  if (dictionary2.className == "dictionaries") {
    dictionary2.className = "dictionaries active"
    structureArray[1] = 1;
  } else {
    dictionary2.className = "dictionaries"
    structureArray[1] = 0;
  }
}
dictionary3.onclick = function(){
  if (dictionary3.className == "dictionaries") {
    dictionary3.className = "dictionaries active"
    structureArray[2] = 1;
  } else {
    dictionary3.className = "dictionaries"
    structureArray[2] = 0;
  }
}
