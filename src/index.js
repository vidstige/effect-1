const raw = [
  require('../static/logo-1.svg'),
  require('../static/logo-2.svg'),
  require('../static/logo-3.svg')];

function start(images) {
  // Drop canvas
  var canvas = document.getElementById('work');
  canvas.parentElement.removeChild(canvas);
  canvas = undefined;
  

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

var images = []; // All images
function store(image) {
  images.push(image);
  return image;
}

var loaders = [];
for (var i = 0; i < raw.length; i++) {
  store(raw[i]);
  loaders.push(
    loadImage(raw[i]).then(pixelify).then(store)
  );
}
Promise.all(loaders).then(function() { start(images); });
