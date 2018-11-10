const raw = [
  require('../static/logo-1.svg'),
  require('../static/logo-2.svg'),
  require('../static/logo-3.svg')];

function start(images) {
  // Drop canvas
  var canvas = document.getElementById('work');
  canvas.parentElement.removeChild(canvas);
  canvas = undefined;

  var duration = 200;
  var im = document.getElementById('target');
  im.width = 640;
  
  var step = [0, 0, 1];
  function animate(t) {
    // 001 223 445
    var k = Math.floor(t % (3*duration * images.length / 2) / duration);
    var index = 2*Math.floor(k/3) + step[k % 3];
    im.src = images[index];
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

function pixelify(img) {
  var canvas = document.getElementById('work');
  var ctx = canvas.getContext('2d');

  var w = 64;
  var h = w * img.height / img.width;
  canvas.width = w;
  canvas.height = h;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL();
}

function loadImage(src) {
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.onload = function() { resolve(img); };
    img.onerror = reject;
    img.src = src;
  });
}

//var crisp = [];
//var pixelized = [];
var images = [];

var loaders = [];
for (var i = 0; i < raw.length; i++) {
  //crisp.push(i);
  images[2*i] = raw[i];
  loaders.push(
    loadImage(raw[i]).then(pixelify).then((function(index) {
      return function(img) {
        images[2*index+1] = img;
      };
    })(i))
  );
}
Promise.all(loaders).then(function() { start(images); });
