w = 1920, h = 1330;
var renderer = new PIXI.WebGLRenderer(w, h);
var cOutput = document.getElementById('wrap');
cOutput.appendChild(renderer.view);

var stage = new PIXI.Container();
var container = new PIXI.Container();
var foreground = new PIXI.Container();
stage.addChild(container);
stage.addChild(foreground); 

var f;
var fg;
var mousex = w/1, mousey = h/1;
var ploader = new PIXI.loaders.Loader();

function init(){
  console.log('dasdsdasd');
  ploader.add('fg', 'img/arrival.jpg');
  ploader.add('depth', 'img/arrival_depth.jpg');

  ploader.once('complete', startMagic);
  // Begin loading -
  ploader.load();
}

function startMagic() {
  fg = new PIXI.Sprite(ploader.resources.fg.texture);

  foreground.addChild(fg);
  
  d = new PIXI.Sprite(ploader.resources.depth.texture);
    f = new PIXI.filters.DisplacementFilter(d, 0);
    fg.filters = [f];  
    window.onmousemove = function(e) {
      mousex = e.clientX;
      mousey = e.clientY;
    };
  animate();
}


function animate() {
console.log('aaaaaaaaaa');
  f.scale.x = (window.innerWidth/2 - mousex) / 80;
  f.scale.y = (window.innerHeight/2 - mousey) / 80;
  fg.addChild(d);
  d.renderable=false;
   
  renderer.render(stage);       
  requestAnimationFrame(animate);
}

// Start -
init();
