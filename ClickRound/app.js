function addRound(left, top) {
  var size = 50;
  var round = document.createElement("div");
      round.style.transition = "all .3s";
      round.style.width = "0px";
      round.style.height = "0px";
      round.style.opacity = "0";
      round.style.background = "grey";
      round.style.borderRadius = "50%";
      round.style.position = "absolute";
      round.style.left = `${left}px`;
      round.style.top = `${top}px`;
  document.body.appendChild(round)

  setTimeout(function(){
    round.style.width = `${size}px`;
    round.style.height = `${size}px`;
    round.style.left = `${left - size / 2}px`;
    round.style.top = `${top - size / 2}px`;
    round.style.opacity = "0.5";

  }, 0)
  setTimeout(function(){
    round.style.opacity = "0";
  }, 300);

  setTimeout(function(){
    document.body.removeChild(round)
  }, 600)
}

window.addEventListener("click", function(init) {
  addRound(init.clientX, init.clientY);
})
