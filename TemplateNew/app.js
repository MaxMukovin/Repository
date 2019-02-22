// text.value = "This “Constitution” defines rules and processes for the governance and operations of an organization. The “Ratifiers” are adopting these rules as the formal authority structure for the “Organization” specified upon the Constitution’s adoption, which may be an entire entity or a part of one that the Ratifiers have authority to govern and run. The Ratifiers and anyone else who agrees to take part in the governance and operations of the Organization (its “Partners”) may rely upon the authorities granted by this Constitution, and also agree to be bound by its duties and constraints";

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

// Сохранение Куки
function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}
/////////////////////////////////////////////////////////////////////////////////

if (getСookie("innerText") == null) {setCookie("innerText", "", "Fri, 01-Jan-2100 00:00:00 GMT", "/")};

console.log(document.cookie);
innerText = getСookie("innerText");
text.value = innerText;

btnConfirm.onclick = function() {
  setCookie("innerText", text.value, "Fri, 01-Jan-2100 00:00:00 GMT", "/")
  while (table.children.length > 0) {
    table.removeChild(table.children[0])
  }
  var data = text.value.toLowerCase().replace(/\(|\)|\.|\,/g, '');


  data = data.split(" ").map(String).sort();

  function unique(arr) {
    var obj = {};

    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];
      obj[str] = true; // запомнить строку в виде свойства объекта
    }

    return Object.keys(obj); // или собрать ключи перебором для IE8-
  }

  data = unique(data)

  var color1 = "#fff",
      color2 = "#f5f5f5",
      currentColor = color1,
      counterColor = 0,
      check = "a";
  console.log(data);
  // var table = container.appendChild(document.createElement("table"));
  for (var i = 0; i < data.length; i++) {
    var tr = table.appendChild(document.createElement("tr"));
    var td1 = tr.appendChild(document.createElement("td"));
    var td2 = tr.appendChild(document.createElement("td"));
    td1.innerHTML = data[i];
    td1.className = "notranslate";
    td2.innerHTML = data[i];


    if (data[i][0] != check) {
      counterColor++;
      if (counterColor %2 == 0) {
        currentColor = color1;
      } else {
        currentColor = color2;
      }
      check = data[i][0];
    }

    tr.style.background = currentColor;
  }
  // document.body.children[0].removeChild(text)

}
