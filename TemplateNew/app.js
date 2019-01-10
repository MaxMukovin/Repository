for (var i = 0; i < 255; i++) {
  var block = document.createElement("div")
  block.style.background = `rgb(${i}, ${i}, ${i})`
  block.style.height = `500px`
  block.style.width = `${innerWidth / 255}px`
  block.style.float = `left`
  block.style.marginTop = `50px`
  document.body.appendChild(block)
}

var block = document.createElement("div")
document.body.appendChild(block)
for (var i = 0; i < 128; i++) {
  var circle = document.createElement("div")
  circle.id = "circle";
  block.id = "block";
  circle.style.height = `500px`
  circle.style.width = `${innerWidth / 129}px`
  circle.style.fontSize = `5px`
  circle.style.fontFamily = `verdana`
  block.style.marinTop = "300px"
  block.appendChild(circle)
  circle.appendChild(document.createTextNode(i))
}
