const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 30,
  color: "green",
  speed: 5
};

let food = [];

function spawnFood() {
  for (let i = 0; i < 15; i++) {
    food.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 10,
      color: "red"
    });
  }
}

spawnFood();

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

function drawFood() {
  for (let i = 0; i < food.length; i++) {
    ctx.beginPath();
    ctx.arc(food[i].x, food[i].y, food[i].size, 0, Math.PI * 2);
    ctx.fillStyle = food[i].color;
    ctx.fill();
  }
}

function checkEat() {
  for (let i = 0; i < food.length; i++) {
    let dx = player.x - food[i].x;
    let dy = player.y - food[i].y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < player.size + food[i].size) {
      player.size += 1;
      food.splice(i, 1);
      food.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10,
        color: "red"
      });
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  drawPlayer();
  checkEat();
  requestAnimationFrame(animate);
}

animate();
