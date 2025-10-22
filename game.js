const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 25,
  color: "green"
};

let foods = [];

for (let i = 0; i < 20; i++) {
  foods.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 8,
    color: "red"
  });
}

window.addEventListener("mousemove", (e) => {
  player.x = e.clientX;
  player.y = e.clientY;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // mâncare
  for (let f of foods) {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
    ctx.fillStyle = f.color;
    ctx.fill();
  }

  // jucător
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fillStyle = player.color;
  ctx.fill();

  requestAnimationFrame(draw);
}

draw();
