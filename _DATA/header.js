// Добавляет кнопку НАЗАД слева
window.addEventListener("DOMContentLoaded", function(){
  var header = document.body.appendChild(document.createElement("div"));
      header.id = 'header';
  var backButton = header.appendChild(document.createElement("a"))
      backButton.className = "backBtn";
      backButton.href = "../index.html";

  var style = document.body.appendChild(document.createElement("style"))
  style.appendChild(document.createTextNode(`
    #header {
      position: absolute;
      width: 100%;
      height: 40px;
      background: #fdfdfd;
      border-bottom: 1px solid #eee;
      transition: all .3s;
      transform-origin: top;
      top: 0;
      left: 0;
    }
    .backBtn {
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
