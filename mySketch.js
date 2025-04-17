let particles = [];
let dotFlashes = [];
let currentScene = 0;
let touchStartX;
let circleDots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont("Noto Serif TC");

  // 初始化圍繞文字的點
  for (let i = 0; i < 100; i++) {
    let angle = map(i, 0, 100, 0, TWO_PI);
    let r = 100;
    circleDots.push({
      x: width * 0.75 + cos(angle) * r,
      y: height * 0.25 + sin(angle) * r
    });
  }
}

function draw() {
  background(0, 40);

  switch (currentScene) {
    case 0:
      createDotFlashes();
      updateDotFlashes();
      drawFlameScene();
      break;
    case 1:
      drawCircleDots();
      drawFocusWord("黑", color(255, 255, 255));
      break;
    case 2:
      drawFocusWord("黑", color(255, 0, 0), width / 2, height / 2);
      break;
  }
}

function drawFlameScene() {
  push();
  translate(100, height * 0.75);
  scale(1, -1);
  drawAxes();
  createFlameParticles();
  updateFlameParticles();
  pop();
}

function drawAxes() {
  let flicker = map(sin(frameCount * 0.2), -1, 1, 80, 200);
  let glowColor = color(0, 255, 255, flicker);
  let brightColor = color(0, 255, 255);

  strokeWeight(12);
  stroke(glowColor);
  line(-width * 5, 0, width * 5, 0);
  line(0, -height * 5, 0, height * 5);

  strokeWeight(2);
  stroke(brightColor);
  line(-width * 5, 0, width * 5, 0);
  line(0, -height * 5, 0, height * 5);
}

// ------ 閃現的點效果 ------
function createDotFlashes() {
  if (frameCount % 10 === 0) {
    let x = random(width * 0.1, width * 0.9);
    let y = random(30, height / 2.2);
    dotFlashes.push({
      x: x,
      y: y,
      alpha: 255,
      size: 3,
      growth: random(0.2, 0.6)
    });
  }
}

function updateDotFlashes() {
  for (let i = dotFlashes.length - 1; i >= 0; i--) {
    let p = dotFlashes[i];
    fill(255, p.alpha);
    noStroke();
    textSize(p.size);
    text("點", p.x, p.y);
    p.alpha -= 4;
    p.size += p.growth;
    if (p.alpha <= 0) {
      dotFlashes.splice(i, 1);
    }
  }
}

// ------ 火焰粒子效果 ------
function createFlameParticles() {
  for (let i = 0; i < 3; i++) {
    let angle = random(TWO_PI);
    let speed = random(2, 6);
    particles.push({
      x: 0,
      y: 0,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      alpha: 255,
      size: random(6, 12),
      color: color(random(220, 255), random(80, 160), 0)
    });
  }
}

function updateFlameParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    stroke(p.color);
    strokeWeight(p.size);
    point(p.x, p.y);
    p.x += p.vx / 5;
    p.y += p.vy / 5;
    p.alpha -= 3;
    p.size *= 0.98;
    p.color.setAlpha(p.alpha);
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

// ------ 圍成圓圈的點和焦點「黑」 ------
function drawCircleDots() {
  fill(180);
  noStroke();
  textSize(16);
  for (let pt of circleDots) {
    text("點", pt.x, pt.y);
  }
}

function drawFocusWord(word, col, x = width / 2, y = height / 2) {
  fill(col);
  textSize(48);
  text(word, x, y);
}

// ------ 手機滑動偵測 ------
function touchStarted() {
  touchStartX = touches[0].x;
  return false;
}

function touchEnded() {
  if (touches.length === 0) return false;
  let touchEndX = touches[0].x;
  let diff = touchEndX - touchStartX;

  if (abs(diff) > 50) {
    if (diff < 0) {
      currentScene = (currentScene + 1) % 3;
    } else {
      currentScene = (currentScene - 1 + 3) % 3;
    }
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
