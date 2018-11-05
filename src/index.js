const logo = require('../static/logo.svg');
var canvas = document.getElementById('target');
var ctx = canvas.getContext('2d');

var img = new Image();
img.onload = function() {
    ctx.drawImage(img, 0, 0);
}
img.src = logo;
