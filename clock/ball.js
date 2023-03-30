function Ball() {
  this.x = random(0, width);
  this.y = random(- height * 4, -height);
  // this.y = randomGaussian((-5/2) * height, height);
  this.r = floor(random(5, 9));
  this.vel = 0;
  this.acc = 0;
  
  this.display = function() {
    fill(mcolor);
    noStroke();
    circle(this.x, this.y, this.r * 2);
  }
  
  this.update = function() {
    this.y += this.vel;
    this.vel += this.acc;
  }
  
  this.reset = function() {
    this.x = random(0, width);
    this.y = random(- height * 4, -height);
    // this.y = randomGaussian((-5/2) * height, height);
    this.r = floor(random(5, 9));
    this.vel = 0;
    this.acc = 0;
  }
  
  this.fall = function() {
    this.acc = this.r * (1/14);
  }
}