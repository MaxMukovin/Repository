var id = 0;
    input.value = 20;

// ==================================================================
// Строит блок и выдаёт его вызывающей функции
function newBlock() {
  var block = document.createElement("div");
      block.id = id;
      block.style.transition = "all .3s";
      block.style.width = "240px";
      block.style.height = "0px";
      block.style.marginTop = "5px";
      block.style.background = "lightseagreen";
      block.style.padding = "5px";
      block.style.overflow = "hidden";
      block.style.borderRadius = "3px";

  var content = document.createElement("div");
      content.style.display = "inline-block";
      content.style.width = "200px";
      content.style.height = "20px";
      content.style.background = "lightgray";
      block.appendChild(content);

setTimeout(function() {
  block.style.height = "22px";
}, 2);

  var message = document.createTextNode(input.value)
      content.appendChild(message)

  var button = document.createElement("button");
      button.style.display = "inline-block";
      block.appendChild(button);
      button.appendChild(document.createTextNode("Del"))

      button.addEventListener("mouseup", function() {
        setTimeout(function(){
          block.style.height = "0px";
          block.style.padding = "0px";
          block.style.margin = "0px";
          block.style.opacity = "0";
          block.style.marginLeft = "-100px";
        }, 0);

        setTimeout(function(){
          var removeElement = document.getElementById(block.id)
          container.removeChild(removeElement)
        }, 300);
      })
      return block;
}

// -- ФУНКЦИИ --

// Добавляет элемент после всех
function addElementAfter() {
  var block = newBlock()
  container.appendChild(block);
  // input.value = id;
  id++
}
// Добавляет элемент перед всеми
function addElementBefore() {
  var block = newBlock()
  container.insertBefore(block, container.children[4]);
  // input.value = id;
  id++
}
function removeAllElevents() {
  while (container.children.length > 4) {
      container.removeChild(container.children[4])
  }
  id = 0
}
// ==================================================================

// -- СОБЫТИЯ --

// При нажатии на кнопку Добавить, добавиться элемент
addAfter.addEventListener("mouseup", addElementAfter)
addBefore.addEventListener("mouseup", addElementBefore)
removeAll.addEventListener("mouseup", removeAllElevents)

// При нажатии на Ввод, добавится элемент
input.addEventListener("keydown", function(eventObj) {
  console.log(eventObj.keyCode);
  if (eventObj.keyCode == 13) {
    addElementAfter()
    input.value = '';
  }
})

// ==================================================================
