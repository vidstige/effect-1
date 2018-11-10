const logo = require('../static/logo.svg');

function start(images) {
  var duration = 500;
  var im = document.getElementById('target');
  im.width = 640;
  
  function animate(t) {
    var index = Math.floor(t % (duration * images.length) / duration);
    im.src = images[index];
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

var img = new Image();
img.onload = function() {
  var canvas = document.getElementById('work');
  var ctx = canvas.getContext('2d');

  widths = [63];
  colors = ['#e1706e', '#f2cfc9', '#4a8daf', '#d8d8d8', '#6ec3d0', '#1c2b49]'];

  images = [logo];
  for (var i = 0; i < widths.length; i++) {
    var w = widths[i];
    var h = w * img.height / img.width;
    for (var j = 0; j < colors.length; j++) {
      canvas.width = w;
      canvas.height = h;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      ctx.globalCompositeOperation = 'source-in';
      ctx.fillStyle = colors[j];
      ctx.fillRect(0, 0, w, h);
      images.push(canvas.toDataURL());
    }
  }
  canvas.parentElement.removeChild(canvas);
  canvas = undefined;
  start(images);
}

img.src = logo;
