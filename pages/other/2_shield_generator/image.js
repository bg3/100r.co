let daisy = new SVG.Color('#f5f1e6');
let buttercup = new SVG.Color('#ffcd05');
let marigold = new SVG.Color('#f19c1f');
let rose = new SVG.Color('#e13f26');
let cinnamon = new SVG.Color('#6b3324');
let forget_me_not = new SVG.Color('#b0e0e3');
let hydrangea = new SVG.Color('#3fa0d9');
let lupine = new SVG.Color('#354C85');
let sage = new SVG.Color('#899b6d');
let pine = new SVG.Color('#00503d');
let azalea = new SVG.Color('#e1a6cb');
let silver_wattle = new SVG.Color('#8d8b7f');
//let birch_knot = new SVG.Color('#46443f');
let birch_knot = new SVG.Color('#463f46');
let ironbark = new SVG.Color('#1b1b1b');
let unknown  = new SVG.Color('#9f7360');
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
  const col_1 = colours[Math.floor(Math.random() * colours.length)];
  const bg = svg.rect(size, size).attr({ fill: col_1 });

  //  number of elements
  //  next element - cannot be same colour
  
  let col_2;

  do {
    col_2 = colours[Math.floor(Math.random() * colours.length)];
  } while (col_2 == col_1);

  const circleDiameter = size - size / 10;
  const margin = (size - circleDiameter) / 2;
  svg.circle(circleDiameter, circleDiameter).attr({ fill: col_2 }).move(margin, margin);

  //  next element - can be same colour as either of previous two.
  //  no more than three colours.

  const col_3 = colours[Math.floor(Math.random() * colours.length)];
  
  //  draw three circles, arranged in an equilateral triangle.
  //  function to place X items evenly around a circle.
  //  circle radius, centre, start position (from where? radians?) and array of items? or number of items?
  //  pass array of items in? pass function to something?

  const smCircleDiameter = circleDiameter / 3; 
  
  svg.circle(smCircleDiameter, smCircleDiameter).attr({ fill: col_3 }).move(size / 2 - smCircleDiameter / 2, size / 2 - smCircleDiameter / 2 - 39);
  svg.circle(smCircleDiameter, smCircleDiameter).attr({ fill: col_3 }).move(size / 2 - smCircleDiameter / 2 + 36, size / 2 - smCircleDiameter / 2 + 25);
  svg.circle(smCircleDiameter, smCircleDiameter).attr({ fill: col_3 }).move(size / 2 - smCircleDiameter / 2 - 36, size / 2 - smCircleDiameter / 2 + 25);
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
