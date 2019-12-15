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

function colour(index) {

  if (index < 0 || index >= colours.length) {
    index = 0;
  }
  return colours[index];
}

function randomColour(butNot) {
  let c;
  do {
    c = colours[Math.floor(Math.random() * colours.length)];
  } while (c == butNot);
  return c;
}

