document.body.style.display = "none";
document.addEventListener("DOMContentLoaded", function() {
  for (var i = 0; i < document.body.children.length; i++) {
    document.body.children[i].style.transform = "translateX(-100%)";
    document.body.children[i].style.opacity = "0";

    document.body.children[i].style.transition = "all .3s";
  }
  var counter = 0;
  function showDOM() {
    document.body.children[counter].style.transform = "";
    document.body.children[counter].style.opacity = "1";
    counter++;
    if (counter < document.body.children.length) {
      setTimeout(showDOM, 150)
    }
  }
  document.body.style.display = "";
  showDOM();
})
