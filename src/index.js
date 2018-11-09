const logo = require('../static/logo.svg');

function start(img1, img2) {
  var im = document.getElementById('t2');
  im.width = 640;
  
  function animate(t) {
    if (t % 1000 > 500) {
      im.src = img1;
    } else {
      im.src = img2;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}


var img = new Image();
img.onload = function() {
  var canvas = document.getElementById('target');
  var ctx = canvas.getContext('2d');

  var w = 64;
  var h = w * img.height / img.width;
  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(img, 0, 0, w, h);
  var pixelized = canvas.toDataURL();
  canvas.parentElement.removeChild(canvas);
  canvas = undefined;
  start(logo, pixelized);
}

img.src = logo;
