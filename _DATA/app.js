// Добавляет кнопку НАЗАД слева
window.addEventListener("DOMContentLoaded", function(){

  var backButton = document.body.appendChild(document.createElement("a"))
  backButton.appendChild(document.createTextNode("Назад"))
  backButton.className = "backBtn"
  backButton.href = "../index.html"

  var style = document.body.appendChild(document.createElement("style"))
  style.appendChild(document.createTextNode(`
    .backBtn {
      text-decoration: none;
      position: absolute;
      display: block;
      transition: all .3s;
      top: 10px;
      left: 10px;
      padding: 5px;
      font-family: verdana, sans-serif;
      font-size: 16px;
      background: #eee;
      color: #999;
      border: 1px solid #ddd;
      border-radius: 3px;
      box-shadow: 1px 2px 3px rgba(0,0,0,0.1);
    }
    .backBtn:hover {
      border: 1px solid #ccc;
      color: #555;
      box-shadow: 1px 2px 3px rgba(0,0,0,0.3);
    }
    .backBtn:active {
      background: #ccc;
    }
  `))
})
