function Emblem(seed, element, size) {
  this.size = size || 128; 

  let el = SVG(element).size(size, size);
  let svg = el.group()

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

  svg.transform({ scale: 4, cx: 0, cy: 0 });

  return el;
}

//for (let i = 0; i < 66; i++) {
//  new Emblem('test', element, size); 
//}
