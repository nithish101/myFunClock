let digitalOn = 1;
let hourCircle = false;
let circleNum = 400;
let diameter;
let closing = true;
let closeSpeed;
let bgs = [], bgNum = 0;
let balls = [];
let lastM;
let scolor;
let mcolor;
let hcolor;
let digitalFont, dots = false;
let hourOffset = 0;
let showInfo = false;
let showDate = true;
const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

function setup() {
  // createCanvas(1920, 1080);
  createCanvas(1440, 900);
  diameter = (3 / 2) * width;
  // textFont("Courier");
  digitalFont = loadFont("bubbleFont.otf");
  textFont(digitalFont);

  scolor = color(255, 204, 0);
  mcolor = color(204, 255, 0);
  hcolor = color(0, 255, 204);
  bgs.push(0);
  bgs.push(loadImage('backgrounds/moonBG.jpeg'));
  bgs.push(loadImage('backgrounds/bigSurBG.jpeg')); 
  bgs.push(loadImage('backgrounds/mojaveBG.webp'));
  bgs.push(loadImage('backgrounds/sandBG.jpeg'));
  bgs.push(loadImage('backgrounds/treeBG.jpeg'));
  bgs.push(loadImage('backgrounds/catalinaBG.jpg'));
  bgs.push(loadImage('backgrounds/geometricBG.jpg'));

  for (let i = 0 ; i < circleNum; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  let h = hour();
  let m = minute();
  let s = second();
  const d = new Date();
  let ms = d.getMilliseconds();
  // console.log(d.toGMTString());
  d.setHours(d.getHours() + hourOffset);
  h = d.getHours();
  
  background(bgs[bgNum]);
  if (m != lastM) changeColors();
  lastM = m;
  
  if (hourCircle) {
    push();
    translate(width / 2, height / 2);
    noFill();
    stroke(hcolor);
    strokeWeight(6);
    rotate(-PI / 2);
    arc(0, 0, diameter, diameter, 0, TAU * (((h + 1) % 12) / 12));
    diameter += closeSpeed;
    closeSpeed += 0.018;

    pop();
  }
  push();
  strokeWeight(6);
  stroke(scolor);
  line(0, (13 / 80) * height, width / 2, (13 / 80) * height);
  stroke(mcolor);
  line(0, (15 / 80) * height, width / 2, (15 / 80) * height);
  stroke(hcolor);
  line(0, (17 / 80) * height, width / 2, (17 / 80) * height);
  translate(width / 2, height / 2);

  noFill();
  strokeWeight(6);
  rotate(-PI / 2);
  stroke(scolor);
  arc(0, 0, (27 / 40) * height, (27 / 40) * height, 0, (TAU * (s + ms / 1000)) / 60);

  stroke(mcolor);
  arc(0, 0, (25 / 40) * height, (25 / 40) * height, 0, (TAU * (m + s/60)) / 60);

  stroke(hcolor);
  arc(0, 0, (23 / 40) * height, (23 / 40) * height, 0, TAU * (((h % 12) + m/60) / 12));
  pop();
  
  if (dots) {
    let crad = height * (40 / 80) - 16;
    for (let n = 0; n < 60; n ++) {
      stroke(255, 100);
      // if (s < n) break;
      if (n % 15 == 0) {
        strokeWeight(10);
      } else if (n % 5 == 0) {
        strokeWeight(6);
      } else {
        strokeWeight(3);
      }
      point(crad * sin(n * TAU / 60) + width / 2, -crad * cos(n * TAU / 60) + height / 2);
    }
  }

  translate(width/2, height/2);
  
  if (digitalOn % 3) {
    drawDigital(h, m, s);
  } else {
    push();
    rotate(TAU * (s + ms / 1000) / 60);
    stroke(scolor);
    line(0, 0, 0, -height / 4 + 5);
    pop();

    push();
    rotate((TAU * (m + s/60)) / 60);
    stroke(mcolor);
    line(0, 0, 0, -height / 6);
    pop();
    
    push();
    rotate((TAU * ((h % 12)) + m/60) / 12);
    stroke(hcolor);
    line(0, 0, 0, -height / 8);
    pop();
    
    strokeWeight(6);
    
    push();
    let mstring = str(m);
    if (mstring.length == 1) mstring = "0" + mstring;
    textFont("Courier");
    textSize(height / 30);
    noStroke();
    fill(hcolor);
    if (s % 2 == 1) {
      text(h + ":" + mstring, 0, (15/40) * height);
    } else {
      text(h + " " + mstring, 0, (15/40) * height);
    }
    
    pop();
  }
  translate(-width/2, -height/2);
  
  if (showDate) {
    push();
    textAlign(CENTER);
    textSize(height / 36);
    textFont("Courier");
    fill(hcolor);
    noStroke();
    text(d.toLocaleDateString('en-us', options), width / 2, height * (3/36));
    pop();
  }
  
  if (showInfo) {
    push();
    textAlign(LEFT);
    textSize(height / 36);
    textFont("Comic Sans");
    fill(255);
    text(d.toTimeString().substring(9), width / 36, height * (35/36));
    pop();
  }

  if (m == 59 && s == 57 && !hourCircle) {
    hourCircle = true;
    closeSpeed = -10;
  } else if (diameter < (23 / 40) * height) {
    hourCircle = false;
    diameter = 1.5 * width;
  }
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
  }
  
  if (m == 59) return;
  
  if (s == 59) {
    for (let i = 0; i < balls.length; i++) {
      balls[i].fall();
    }
  } else if (s == 2) {
    for (let i = 0; i < balls.length; i++) {
      balls[i].reset();
    }
  }
}

function drawDigital(h, m, s) {
  let hstring, mstring, sstring;
  hstring = str(h % 12);
  if (hstring.length == 1) hstring = "0" + hstring;
  mstring = str(m);
  if (mstring.length == 1) mstring = "0" + mstring;
  sstring = str(s);
  if (sstring.length == 1) sstring = "0" + sstring;

  textAlign(CENTER, CENTER);
  stroke(0);
  rectMode(CENTER);
  if (digitalOn % 3 == 1) {
    textSize(width / 7);
    fill(hcolor);
    text(hstring, width / 64, (-10 / 64) * height, width);
    fill(mcolor);
    text(mstring, width / 64, (0 / 64) * height, width);
    fill(scolor);
    text(sstring, width / 64, (10 / 64) * height, width);
  } else {
    textSize(width / 8);
    fill(230);
    text(hstring + ":" + mstring + ":" + sstring, 0, 0);
  }
}

function mouseClicked() {
  digitalOn++;
}

function keyTyped() {
  if (key === " ") {
    dots = !dots;
  } else if (key === "f") {
    let fs = fullscreen();
    fullscreen(!fs);
  } else if (key === 'b') {
    bgNum += 1;
    bgNum %= bgs.length;
  } else if (key === 'c') {
    changeColors();
  } else if (key == "i") {
    showInfo = !showInfo;
  } else if (key == 'd') {
    showDate = !showDate;
  }
}

function changeColors() {
  colorMode(HSB);
  let hue = random(30, 300);
  scolor = color(hue, 100, random(90, 100));
  mcolor = color(359 - hue, 100, 255);
  hcolor = color(hue + random([-1, 1]) * random(10, 20), 50, brightness(scolor) - random(5, 10));
}
