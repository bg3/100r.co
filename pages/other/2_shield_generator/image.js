let daisy = new SVG.Color('#f5f1e6');
let buttercup = new SVG.Color('#ffcd05');
let marigold = new SVG.Color('#f19c1f');
let rose = new SVG.Color('#e13f26');
let forget_me_not = new SVG.Color('#b0e0e3');
let cinnamon = new SVG.Color('#70422b');
let hydrangea = new SVG.Color('#3fa0d9');
let lupine = new SVG.Color('#354C85');
let sage = new SVG.Color('#899b6d');
let pine = new SVG.Color('#00503d');
let azalea = new SVG.Color('#e1a6cb');
let silver_wattle = new SVG.Color('#95a4ad');
let birch_knot = new SVG.Color('#463f46');
let ironbark = new SVG.Color('#1c1c1c');
let unknown  = new SVG.Color('#724f8e');
let transparent = new SVG.Color('#ff00ff');

const colours = [ daisy, buttercup, marigold, rose, cinnamon, forget_me_not, hydrangea, lupine, sage, pine, azalea, silver_wattle, birch_knot, ironbark, unknown ];


const element = 'svgimage'
const size = 200;

function ColourSample(colours, element, size) {
  let svg = SVG(element).size(size, size); 
  let x = size / 40;
  let y = x;
  for (let colour in colours) {
    svg.circle(size / 5, size / 5).attr({fill:colours[colour]}).move(x, y);
    x += size/4;
    if (x >= size) {
      y+= size/4;
      x = size / 40;
    }
  }
}

function Emblem(seed, element, size) {
  
  //  generates the square emblem that is the basis for the banners.
  this.seed = seed || 'Marmaladian'; 
  this.size = size || 100; 

  //  how to break seed down?
  //  why set 'this' values?
  
  let svg = SVG(element).size(size, size);

  //  background colour
  c = colours[Math.floor(Math.random() * colours.length)];
  const bg = svg.rect(size, size).attr({ fill: c });

  //  number of elements
  //  next element - cannot be same colour
    
  let old_col;

  do {
    c = colours[Math.floor(Math.random() * colours.length)];
  } while (c == old_col);

  //  shape functions
  function three_circles(r1, r2) {
    //  later extend this to X number of X arranged in a circle.
    svg.circle(r1, r1).attr({ fill: c }).move(size / 2 - r1 / 2, size / 2 - r1 / 2 - 39);
    svg.circle(r1, r1).attr({ fill: c }).move(size / 2 - r1 / 2 + 36, size / 2 - r1 / 2 + 25);
    svg.circle(r1, r1).attr({ fill: c }).move(size / 2 - r1 / 2 - 36, size / 2 - r1 / 2 + 25);
  }

  function triangle(size, scale, rotation) {
    //svg.polygon(`0,0 0,${size * scale}, 0,${size * scale}`).fill(c).stroke('none');
    //svg.polygon('0,0 0,100, 0,100').fill(c).stroke('none');
    t = svg.polygon(`0,0 0,${ size * scale } ${ size * scale },0`).fill(c);
    t.transform({ rotation: 90});
  }

  const circleDiameter = size - size / 10;
  const margin = (size - circleDiameter) / 2;
  if (Math.random(1) > 0.5) {
    triangle(size, 1, 0);
  } else {
    svg.circle(circleDiameter, circleDiameter).attr({ fill: c }).move(margin, margin);
  }

  //  next element - can be same colour as either of previous two.
  //  no more than three colours.

  c = colours[Math.floor(Math.random() * colours.length)];
  
  //  draw three circles, arranged in an equilateral triangle.
  //  function to place X items evenly around a circle.
  //  circle radius, centre, start position (from where? radians?) and array of items? or number of items?
  //  pass array of items in? pass function to something?

  const smCircleDiameter = circleDiameter / 3; 

  if (Math.random(1) > 0.5) {
    three_circles(smCircleDiameter)
  } else {
    triangle(size, 0.5, 0);
  }
}

const colorpot = new ColourSample(colours, element, size);
//const em = new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
new Emblem('test', element, size); 
