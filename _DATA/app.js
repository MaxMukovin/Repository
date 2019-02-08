// Добавляет кнопку НАЗАД слева
window.addEventListener("DOMContentLoaded", function(){

  var backButton = document.body.appendChild(document.createElement("a"))
  backButton.appendChild(document.createTextNode(""))
  backButton.className = "backBtn";
  backButton.href = "../index.html";

  var style = document.body.appendChild(document.createElement("style"))
  style.appendChild(document.createTextNode(`
    .backBtn {
      // background: url("https://img.icons8.com/color/96/000000/left-squared.png");
      background: url("https://img.icons8.com/color/96/000000/back.png");
      background-size: cover;
      position: absolute;
      display: block;
      transition: all .3s;
      top: 7px;
      left: 7px;
      width: 27px;
      height: 27px;
      opacity: .5;
    }
    .backBtn:hover {
      opacity: 1;

    }
    .backBtn:active {

    }
  `))
})
