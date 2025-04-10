let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  textAlign(CENTER, CENTER); // 設置文字對齊方式
}

function draw() {
  background(0, 40);

  push();
  translate(100, height * 0.75); // 原點在畫面左側中下
  scale(1, -1); // Y 軸反轉，讓原點在畫面下方
  drawAxes(); // 畫坐標軸

  // 當觸摸靠近原點時，顯示火焰效果
  if (touches.length > 0) {
    if (isTouchNearOrigin()) {
      createFlameParticles(); // 創建火焰粒子
    }
  }

  updateFlameParticles(); // 更新火焰粒子
  pop();

  drawText(); // 顯示文字
}

function drawAxes() {
  let flicker = map(sin(frameCount * 0.2), -1, 1, 80, 200);
  let glowColor = color(0, 255, 255, flicker);
  let brightColor = color(0, 255, 255);

  strokeWeight(12);
  stroke(glowColor);
  line(-width * 5, 0, width * 5, 0); // X軸
  line(0, -height * 5, 0, height * 5); // Y軸

  strokeWeight(2);
  stroke(brightColor);
  line(-width * 5, 0, width * 5, 0);
  line(0, -height * 5, 0, height * 5);
}

function isTouchNearOrigin() {
  for (let i = 0; i < touches.length; i++) {
    let tx = touches[i].x - 100;
    let ty = -(touches[i].y - height * 0.75); // 修正 Y 座標對應 scale(-1)
    if (dist(tx, ty, 0, 0) < 50) {
      return true;
    }
  }
  return false;
}

function createFlameParticles() {
  for (let i = 0; i < 30; i++) {
    let angle = random(TWO_PI); // 讓火焰粒子隨機朝向四周散開
    let speed = random(2, 6);
    particles.push({
      x: 0,
      y: 0,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      alpha: 255,
      size: random(6, 12),
      color: color(random(220, 255), random(80, 160), 0) // 限制為紅、橙、黃範圍
    });
  }
}

function updateFlameParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    stroke(p.color);
    strokeWeight(p.size);
    point(p.x, p.y);

    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 3; // 火焰逐漸變暗
    p.size *= 0.98; // 粒子逐漸縮小
    p.color.setAlpha(p.alpha);

    if (p.alpha <= 0) {
      particles.splice(i, 1); // 當透明度小於0時刪除粒子
    }
  }
}

// 顯示螢光閃爍效果的文字
function drawText() {
  let flicker = map(sin(frameCount * 0.1), -1, 1, 80, 255); // 控制閃爍的強度
  let glowColor = color(255, 255, 255, flicker); // 設置文字的螢光顏色

  textSize(32);
  fill(glowColor); // 使用螢光顏色
  text("一切的一切都從原點開始", width / 2, height * 0.2); // 顯示在畫面中間偏上
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
