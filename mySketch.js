let particles = [];
let dotFlashes = [];
let dotCount = 20;
let radius = 150;

function setup() {
  createCanvas(800, 800);
  noFill();
  textAlign(CENTER, CENTER);
  textFont("Noto Serif TC");
}

function draw() {
  background(0, 40);

  // 第一象限的「閃點」
  //createDotFlashes();
  //updateDotFlashes();
	// 第一象限的焦點畫面
  drawFocus(); 
  // 左下角原點火焰
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

// ---------- 閃現的「點」們 ----------
function createDotFlashes() {
  if (frameCount % 10 === 0) { // 控制生成頻率
    let x = random(width* 0.3, width * 0.8);
    let y = random(30, height * 0.6); // 上半區域
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
    textSize(p.size);
    let c = color(255, 255, 255, p.alpha);
    fill(c);
    noStroke();
    text("點", p.x, p.y);

    p.alpha -= 4;
    p.size += p.growth;

    if (p.alpha <= 0) {
      dotFlashes.splice(i, 1);
    }
  }
}

// ---------- 火焰 ----------
function createFlameParticles() {
  for (let i = 0; i < 5; i++) {
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

//在第一象限畫出「焦點」
function drawFocus() {
  push();
  let centerX = width * 0.6;
  let centerY = height * 0.35;

  textSize(20);
  fill(180);
  noStroke();

  for (let i = 0; i < dotCount; i++) {
    let angle = TWO_PI / dotCount * i;
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    text("點", x, y);
  }

  let flicker = map(sin(frameCount * 0.1), -1, 1, 50, 255); // 控制閃爍的強度
  let glowColor = color(255, 255, 255, flicker); // 設置文字的螢光顏色
	
  textSize(80);
  fill(0);
  stroke(glowColor);
  strokeWeight(3);
  text("黑", centerX, centerY);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
