// Запрет перезагрузки
// window.onbeforeunload = function() {
//   return "";
// }
// Запрет спящего режима
var noSleep =  new  NoSleep ();
document.addEventListener('click', function enableNoSleep() {
  document.removeEventListener('click', enableNoSleep, false);
  noSleep.enable();
}, false);
//

var counterTrue = 0,
    counterFalse = 0,
    buttonHeight = 40,
    element,
    structureArray = [],
    appDictionary = [],
    addCard = document.getElementById("card"),
    newCard = {};

// Удаляем всё из Контейнера
while (container.children.length > 0) {
  container.removeChild(container.firstChild)
}
//
// Создаём массив со структурой
for (var i = 0; i < dictionary.length; i++) {
  structureArray.push(0)
}
structureArray[0] = 1;
//
// Создаём словарь на основании массива структуры
addDictionary();

function addDictionary() {
  appDictionary = [];
  for (var i = 0; i < structureArray.length; i++) {
    if(structureArray[i] == 1){
      appDictionary = appDictionary.concat(dictionary[i]);
      settingsField.children[i + 1].className = "dictionaries active";
    }
  }
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
  word.children[0].appendChild(document.createTextNode(`${appDictionary[element][0]}`));
  word.children[1].appendChild(document.createTextNode(`${transcription}`));
  translation.appendChild(document.createTextNode(`${appDictionary[element][1]}`));
  btnShow.style.height = `${buttonHeight}px`;

  // Начальные значения
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

  var statText = `Всего: ${counterTrue + counterFalse} <br>
                  Осталось: ${appDictionary.length} <br>
                  Правильно: ${counterTrue} (${Math.round(100 * counterTrue / (counterTrue + counterFalse + .001))}%) <br>
                  Неправильно: ${counterFalse} (${Math.round(100 * counterFalse / (counterTrue + counterFalse + .001))}%)<br>`
  stat.innerHTML = statText
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
btnShowSettings.addEventListener("click", function(){
  settingsField.style.height = `${46*3+58}px`;
})

btnConfirm.addEventListener("click", function(){
  settingsField.style.height = "30px";
  addDictionary();
  remove();
})

dictionary1.addEventListener("click", function(){
  if (dictionary1.className == "dictionaries") {
    dictionary1.className = "dictionaries active"
    structureArray[0] = 1;
  } else {
    dictionary1.className = "dictionaries"
    structureArray[0] = 0;
  }
})
dictionary2.addEventListener("click", function(){
  if (dictionary2.className == "dictionaries") {
    dictionary2.className = "dictionaries active"
    structureArray[1] = 1;
  } else {
    dictionary2.className = "dictionaries"
    structureArray[1] = 0;
  }
})
dictionary3.addEventListener("click", function(){
  if (dictionary3.className == "dictionaries") {
    dictionary3.className = "dictionaries active"
    structureArray[2] = 1;
  } else {
    dictionary3.className = "dictionaries"
    structureArray[2] = 0;
  }
})
