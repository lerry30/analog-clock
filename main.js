const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = innerWidth;
const height = canvas.height = innerHeight;

const centerX = width / 2;
const centerY = height / 2;
const radius = 200;
const noOfObjects = 60;
let slice = Math.PI * 2 / noOfObjects;

// I stored all coordinates for perfomance
const numberCoord = [];
const secCoord = [];
const minCoord = [];
const hourCoord = [];

for(let i = 1; i <= noOfObjects; i++) {
    const startAngle = i - 15;
    const angle = slice * startAngle;

    // numbers and dots coordinates
    const noX = centerX + Math.cos(angle) * radius;
    const noY = centerY + Math.sin(angle) * radius;

    // seconds coordinates
    const secRadius = radius - 10;
    const secX = centerX + Math.cos(angle) * secRadius;
    const secY = centerY + Math.sin(angle) * secRadius;

    // minutes coordinates
    const minRadius = radius - 20;
    const minX = centerX + Math.cos(angle) * minRadius;
    const minY = centerY + Math.sin(angle) * minRadius;

    // hours coordinates
    const hourRadius = radius - 40;
    const hourX = centerX + Math.cos(angle) * hourRadius;
    const hourY = centerY + Math.sin(angle) * hourRadius;

    numberCoord[i-1] = { x: noX, y: noY };
    secCoord[i-1] = { x: secX, y: secY };
    minCoord[i-1] = { x: minX, y: minY };
    hourCoord[i-1] = { x: hourX, y: hourY };
}

// draw circle
function drawDot(x, y, radius) {
    context.fillStyle = '#eee';
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
}

function drawNumbers(i, x, y) {
    if(i%5 == 0) {
        context.fillStyle = '#fff';
        context.font = 'bold 18px Arial';
        context.textAlign = 'center';
        context.fillText(`${i/5}`, x, y + 5);
    } else {
        drawDot(x, y, 2);
    }
}

function hand(x, y, color, thickness) {
    context.strokeStyle = color;
    context.beginPath();
    context.lineWidth = thickness;
    context.moveTo(centerX, centerY);
    context.lineTo(x, y);
    context.stroke();
    context.closePath();
}

function drawClock() {
    for(let i = 0; i < noOfObjects; i++) {
        const {x, y} = numberCoord[i];
        drawNumbers(i+1, x, y);
    }

    const currentSec = new Date().getSeconds();
    const sX = secCoord[currentSec].x;
    const sY = secCoord[currentSec].y;
    hand(sX, sY, 'red', 2);

    const currentMin = new Date().getMinutes() - 1;
    const mX = minCoord[currentMin].x;
    const mY = minCoord[currentMin].y;
    hand(mX, mY, '#22e', 4);

    const currentHour = new Date().getHours() % 12;
    // I adjust the clock hour hand to the last index which is 59 from an array to point it to 12:00 not 00:00
    const hourIndex = (currentHour > 0) ? currentHour * 5 - 1 : 59;
    const hX = hourCoord[hourIndex].x;
    const hY = hourCoord[hourIndex].y;
    hand(hX, hY, 'green', 6);
}

setInterval(() => {
    context.clearRect(0, 0, width, height);
    drawClock();
    drawDot(centerX, centerY, 5);
}, 1000);