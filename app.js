const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

let startTime = new Date().getTime();
const draw = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const lineWidth = 0.5;
  const circleLineWidth = 4;
  const frameHeight = 0.05;
  const center = {
    x: canvas.width * 0.5,
    y: canvas.height * frameHeight,
  };
  
  // draw root circle
  pen.strokeStyle = "blue";
  pen.lineWidth = circleLineWidth;
  const radius = canvas.width * 0.015;
  pen.beginPath();
  pen.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  pen.stroke();

  // draw frame
  pen.strokeStyle = "gray";
  pen.lineWidth = lineWidth;

  // left side
  pen.beginPath();
  pen.moveTo(0, center.y);
  pen.lineTo(center.x - radius - circleLineWidth, center.y);
  pen.stroke();

  // right side
  pen.beginPath();
  pen.moveTo(center.x + radius + circleLineWidth, center.y);
  pen.lineTo(canvas.width, center.y);
  pen.stroke();

  // bottom
  pen.lineWidth = lineWidth * 5;
  pen.beginPath();
  pen.moveTo(center.x, center.y + radius + circleLineWidth);
  pen.lineTo(center.x, canvas.height);
  pen.stroke();

  // pendulum
  pen.strokeStyle = "white";
  pen.lineWidth = 2;
  const length = canvas.width;

  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 1000;

  const velocity = 1;
  const maxAngle = 2 * Math.PI;
  const distance = Math.PI + elapsedTime * velocity;
  const modDistance = distance % maxAngle;
  const adjustedDistance =
    modDistance <= Math.PI ? modDistance : maxAngle - modDistance;

  const arcRadius = length * 0.25;
  const x = center.x + arcRadius * Math.cos(adjustedDistance);
  const y = center.y + arcRadius * Math.sin(adjustedDistance);

  pen.beginPath();
  pen.arc(x, y, radius * 0.6, 0, 2 * Math.PI);
  pen.stroke();

  requestAnimationFrame(draw);
};

draw();

// let pendul;

// function setup() {
//   createCanvas(window.screen.height, 360);
//   // Make a new Pendulum with an origin position and armlength
//   pendul = new Pendulum(canvas.width / 2, 0, 175, 0.05);
// }

// function draw() {
//   background(0);
//   pendul.update();
//   pendul.show();
// }

// class Pendulum {
//   constructor(x, y, r, g) {
//     this.origin = createVector(x, y);
//     this.position = createVector();
//     this.r = r;
//     this.angle = PI / 4;

//     this.aVelocity = 0.0;
//     this.aAcceleration = 0.0;
//     this.ballr = 48.0;
//     this.gravity = g;
//   }

//   update() {
//     this.aAcceleration = ((-1 * this.gravity) / this.r) * sin(this.angle);
//     this.aVelocity += this.aAcceleration;
//     this.angle += this.aVelocity;
//   }

//   show() {
//     this.position.set(this.r * sin(this.angle), this.r * cos(this.angle), 0);
//     this.position.add(this.origin);

//     stroke(255);
//     strokeWeight(2);
//     // Draw the arm
//     line(this.origin.x, this.origin.y, this.position.x, this.position.y);
//     ellipseMode(CENTER);
//     fill(127);
//     // Draw the ball
//     ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
//   }
// }
