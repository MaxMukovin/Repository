window.addEventListener("DOMContentLoaded", init);

function init() {

	var style = document.createElement("style");
	document.body.appendChild(style);
	style.appendChild(document.createTextNode("#qrcode img {width: 20px; transition: all .3s; cursor: none; opacity: 0.3;} \
	#qrcode img:hover {	width: 250px; opacity: 1; padding: 20px; background: white; border: 1px solid #eee} canvas {display: none}"))

	var qrcode = document.createElement("div");
	header.appendChild(qrcode);
	qrcode.id = "qrcode";
	qrcode.style.position = "absolute";
	qrcode.style.top = "10px";
	qrcode.style.right = "10px";
	qrcode.style.zIndex = "999";

	var qrcode = new QRCode(document.getElementById("qrcode"), {
		width : 250,
		height : 250
	});

	makeCode();

	qrcode.title = "";

	function makeCode () {
		qrcode.makeCode(window.location.href);
	}
}
