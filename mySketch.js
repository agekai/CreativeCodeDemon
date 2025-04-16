let particles = [];
let dotFlashes = [];
const MAX_FLAME = 100;
const MAX_DOTS = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  textAlign(CENTER, CENTER);
  textFont("Noto Serif TC");
  frameRate(45); // 降低幀率（較穩定且省資源）
}

function draw() {
  background(0, 40);

  createDotFlashes();
  updateDotFlashes();

  push();
  translate(100, height * 0.75);
  scale(1, -1);
  drawAxes();
  createFlameParticles();
  updateFlameParticles();
  pop();
}

function drawAxes() {
  strokeWeight(2);
  stroke(0, 255, 255, 180);
  line(-width, 0, width, 0);
  line(0, -height, 0, height);
}

// ---------- 閃現的「點」們 ----------
function createDotFlashes() {
  if (frameCount % 15 === 0 && dotFlashes.length < MAX_DOTS) {
    dotFlashes.push({
      x: random(width * 0.1, width * 0.9),
      y: random(30, height / 2.2),
      alpha: 200,
      size: 3,
      growth: random(0.15, 0.4)
    });
  }
}

function updateDotFlashes() {
  for (let i = dotFlashes.length - 1; i >= 0; i--) {
    let p = dotFlashes[i];
    textSize(p.size);
    fill(255, p.alpha);
    noStroke();
    text("點", p.x, p.y);

    p.alpha -= 5;
    p.size += p.growth;

    if (p.alpha <= 0) {
      dotFlashes.splice(i, 1);
    }
  }
}

// ---------- 火焰 ----------
function createFlameParticles() {
  if (particles.length < MAX_FLAME) {
    for (let i = 0; i < 2; i++) {
      let angle = random(TWO_PI);
      let speed = random(2, 5);
      particles.push({
        x: 0,
        y: 0,
        vx: cos(angle) * speed,
        vy: sin(angle) * speed,
        alpha: 200,
        size: random(4, 10),
        color: color(random(220, 255), random(80, 160), 0, 200)
      });
    }
  }
}

function updateFlameParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    stroke(p.color);
    strokeWeight(p.size);
    point(p.x, p.y);

    p.x += p.vx * 0.2;
    p.y += p.vy * 0.2;
    p.alpha -= 4;
    p.size *= 0.97;
    p.color.setAlpha(p.alpha);

    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
