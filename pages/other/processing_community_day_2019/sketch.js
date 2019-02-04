//  WALL DRAWING #254 (1975)
//  Sol LeWitt
//  White Lines from the Center of A Yellow Wall to Specified Random Points

const LINES_MAX = 500;
const LINE_WEIGHT_MAX = 50;
const FRAME_MIN = 4;
const LINE_DELAY_MIN = 10;
const LINE_DELAY_MAX = 100;

var fix_centre, art_centre;
var fix_num_lines, art_num_lines;
var fix_line_weight, art_line_weight;
var fix_line_delay, art_line_delay;
var fix_frame_rate; 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - cardHeight());
  art_centre = centre();
}

function cardHeight() {
  return select('#card').height; 
}

function frame_rate() {
  return int(random(FRAME_MIN, 60));
}

function centre() {
  var numOptions = 1;
  var r = int(random(0, numOptions));
  switch (r) {
    case 0:
  //  exact centre
      return createVector(windowWidth / 2, (windowHeight - cardHeight() ) /2);
      break;
  //  rough centre
  }
}

function num_lines() {
  return int(random(2, LINES_MAX)); 
}

function line_weight() {
  return random(0.01, LINE_WEIGHT_MAX);
}

function line_delay() {
  return random(LINE_DELAY_MIN, LINE_DELAY_MAX);
}

function setup() {
  createCanvas(windowWidth, windowHeight - cardHeight());
  frameRate(frame_rate());

  fix_centre = Math.random() >= 0.5;
  fix_num_lines = Math.random() >= 0.5;
  fix_line_weight = Math.random() >= 0.5;
  fix_line_delay = Math.random() >= 0.5;
  fix_frame_rate = Math.random() >= 0.5;

  art_centre = centre();
  art_num_lines = num_lines();
  art_line_weight = line_weight();
  art_line_delay = line_delay();
}

function draw() {
  
  background(255, 205, 5);
  stroke(245, 241, 230);
  strokeWeight(art_line_weight);
  
  var t = Date.now();
  
  for (var i = 0; i < art_num_lines; i++) {
  if (fix_centre == false) {
    art_centre = centre();
  }

  if (fix_num_lines == false) {
    art_num_lines = num_lines();
  }

  if (fix_line_weight == false) {
    art_line_weight = line_weight();
  }

  if (fix_line_delay == false) {
    art_line_delay = line_delay();
  }

  if (fix_frame_rate == false) {
    frameRate(frame_rate());
  }

  console.log(art_line_delay);
  //  how random points are specified
  //    across canvas
  //    within a randomly placed circle(s)
  //      

  
    do {
    } while (Date.now() < (t + art_line_delay));
    line(art_centre.x, art_centre.y, random(0, windowWidth), random(0, windowHeight - cardHeight())); 
  }
    
}
