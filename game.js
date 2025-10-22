const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 25,
  color: "green",
  speed: 5
};

let foods = [];

function createFood() {
  for (let i = 0; i < 20; i++) {
    foods.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 8,
      color: "red"
    });
  }
}

createFood();

window.addEventListener("mousemove", (e) => {
  player.x = e.clientX;
  player.y = e.clientY;
});

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fillStyle = player.color;
  ctx.fill();
}

function drawFoods() {
  for (let f of foods) {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
    ctx.fillStyle = f.color;
    ctx.fill();
  }
}

function checkEat() {
  for (let i = foods.length - 1; i >= 0; i--) {
    const f = foods[i];
    const dx = player.x - f.x;
    const dy = player.y - f.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < player.size + f.size) {
      foods.splice(i, 1);
      player.size += 1;
      foods.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 8,
        color: "red"
      });
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFoods();
  drawPlayer();
  checkEat();
  requestAnimationFrame(loop);
}

loop();
