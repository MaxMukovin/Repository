var newFlower = flower;
document.body.removeChild(document.body.children[0])

var counter = 0;

setInterval(function(){
  counter++;
}, 300)

function addRound(left, top) {

  if (counter < 1) {
    return;
  }
  console.log(counter);
  counter = 0;

  var addFlower = newFlower.cloneNode(true);
      addFlower.style.left = `${left}px`;
      addFlower.style.top = `${top}px`;
      addFlower.style.marginTop = `-58px`;
      addFlower.style.marginLeft = `-57px`;
  var colorR = rnd(0, 255),
      colorG = rnd(0, 255),
      colorB = rnd(0, 255);

      for (var i = 0; i < addFlower.children.length; i++) {
        addFlower.children[i].children[0].style.background = `rgb(${colorR}, ${colorG}, ${colorB})`;
      }

  document.body.appendChild(addFlower)


  setTimeout(function(){
    addFlower.style.transform = `scale(.${rnd(20,45)})`;
  }
  , 0)

}

function rnd(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

window.onmousemove = function(init) {
  if (init.which == 1) {
    addRound(init.clientX, init.clientY)
  }
}
window.onclick = function(init) {
  addRound(init.clientX, init.clientY)
}
