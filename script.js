document.addEventListener('mousemove', e => {
    Object.assign(document.documentElement,{
     style: `
     --move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
     --move-y: ${(e.clientY - window.innerHeight / 2) * -.01}deg;
     `
    })
})
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const raindrops = [];

class Raindrop {
    constructor(x, y, speed, length) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.length = length;
    }

    fall() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0 - this.length;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = 'rgba(174,194,224,0.5)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
}

function createRain() {
    for (let i = 0; i < 500; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * 4 + 2;
        const length = Math.random() * 20 + 10;
        raindrops.push(new Raindrop(x, y, speed, length));
    }
}

function updateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const drop of raindrops) {
        drop.fall();
        drop.draw();
    }
    requestAnimationFrame(updateRain);
}

createRain();
updateRain();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
