const element = 'svgimage'
const size = 128;

function Emblem(seed, element, size) {
  this.seed = seed || 'Marmaladian'; 
  this.size = size || 100; 

  let svg = SVG(element).size(size, size);

  //  background fill
  shape(svg,0).attr({ fill: randomColour(-1) }); 

  let c = randomColour(-1);
  let s = randomShape(svg).attr({ fill: c });

  if (Math.random(1) > 0.75) {
    s.rotate(180, 64, 64);
  } else if (Math.random(1) > 0.75) {
    s.rotate(90, 64, 64);
  }
/*
  if (Math.random(1) > 0.75) {
    s.scale(1/2, 64, 64);
  } else if (Math.random(1) > 0.75) {
    s.scale(1/3, 64, 64);
  } else if (Math.random(1) > 0.75) {
    s.scale(1/4, 64, 64);
  } else if (Math.random(1) > 0.75) {
    s.scale(2, 64, 64);
  }
*/
  if (Math.random(1) > 0.75) {
    s.flip('x', 64);
  } else if (Math.random(1) > 0.75) {
    s.flip('y', 64);
  }

  // 1/4 scale and top left/top right, etc.
 
  let c2 = randomColour(c);
  let s2 = randomShape(svg).attr({ fill: c2 });

  if (Math.random(1) > 0.75) {
    s2.rotate(180, 64, 64);
  } else if (Math.random(1) > 0.75) {
    s2.rotate(90, 64, 64);
  }
/*
  if (Math.random(1) > 0.75) {
    s2.scale(0.5);
  } else if (Math.random(1) > 0.75) {
    s2.scale(2);
  }
*/
  if (Math.random(1) > 0.75) {
    s2.flip('x', 64);
  } else if (Math.random(1) > 0.75) {
    s2.flip('y', 64);
  }

 // 1/4 scale and repeat 4 times.
}

for (let i = 0; i < 66; i++) {
  new Emblem('test', element, size); 
}
