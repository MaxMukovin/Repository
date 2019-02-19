function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
  return ( unescape ( results[2] ) );
  else
  return null;
}

var array = [];

for (var i = 0; i < 20; i++) {
  array.push(i)
}

console.log(array);

document.cookie = `array = ${array}`;
document.cookie = 'number = 123';
document.cookie = "username = User1";
document.cookie = "username = User123132123";
// number = 123;

// Получение массива
var x = get_cookie("array").split(",").map(Number);

// var newArray = x.split(",").map(Number);




// console.log(document.cookie);
console.log(x);
// console.log(newArray);
