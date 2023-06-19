const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");
const get = (selector) => document.querySelector(selector);

const toggles = {
  sound: get("#sound-toggle"),
};

const colors = ["#D0E7F5", "#D9E7F4", "#D6E3F4"];

const settings = {
  startTime: new Date().getTime(), // This can be in the future
  duration: 900, // Total time for all dots to realign at the starting point
  maxCycles: Math.max(colors.length, 100), // Must be above colors.length or else...
  soundEnabled: false, // User still must interact with screen first
  pulseEnabled: true, // Pulse will only show if sound is enabled as well
  instrument: "wave", // "default" | "wave" | "vibraphone"
};

const handleSoundToggle = (enabled = !settings.soundEnabled) => {
  settings.soundEnabled = enabled;
  // toggles.sound.dataset.toggled = enabled;
};

document.onvisibilitychange = () => handleSoundToggle(false);
canvas.onclick = () => handleSoundToggle();

const getFileName = (index) => {
  if (settings.instrument === "default") return `key-${index}`;

  return `${settings.instrument}-key-${index}`;
};

// const keys = colors.map((color, index) => {
//   const audio = new Audio(getUrl(index));

//   audio.volume = 0.15;

//   return audio;
// });

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const anchorRadius = canvas.width * 0.015;
const smallPendulumRadius = canvas.width * 0.008;
const largePendulumRadius = canvas.width * 0.025;

let smallPendulums = [];
for (i = 1; i < 15; i++) {
  let gMax = 0.001;
  let pGravity = gMax - i * 0.00003;

  smallPendulums.push(
    new Pendulum(
      canvas.width * 0.2 + (i * 3.8 * smallPendulumRadius) / 3,
      smallPendulumRadius,
      pGravity,
      Math.PI / 3
    )
  );
}

let largePendulums = [];
const lastSmallPendulumArcRadius =
  smallPendulums[smallPendulums.length - 1].arcRadius;
for (i = 1; i < 5; i++) {
  let gMax = 0.001;
  let pGravity = gMax - i * 0.00003;

  largePendulums.push(
    new Pendulum(
      lastSmallPendulumArcRadius + i * 3 * largePendulumRadius,
      canvas.width * 0.015,
      pGravity,
      Math.PI / 5
    )
  );
}

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

  // draw anchor circle
  pen.strokeStyle = "blue";
  pen.lineWidth = circleLineWidth;
  pen.beginPath();
  pen.arc(center.x, center.y, anchorRadius, 0, 2 * Math.PI);
  pen.stroke();

  // draw frame
  pen.strokeStyle = "gray";
  pen.lineWidth = lineWidth;

  // left side
  pen.beginPath();
  pen.moveTo(0, center.y);
  pen.lineTo(center.x - anchorRadius - circleLineWidth, center.y);
  pen.stroke();

  // right side
  pen.beginPath();
  pen.moveTo(center.x + anchorRadius + circleLineWidth, center.y);
  pen.lineTo(canvas.width, center.y);
  pen.stroke();

  // bottom
  pen.lineWidth = lineWidth * 5;
  pen.beginPath();
  pen.moveTo(center.x, center.y + anchorRadius + circleLineWidth);
  pen.lineTo(center.x, canvas.height);
  pen.stroke();

  smallPendulums.forEach((pendulum) => {
    pendulum.update();
    const x = pendulum.x + center.x;
    const y = pendulum.y + center.y;

    pen.strokeStyle = "white";
    pen.lineWidth = lineWidth * 4;
    pen.beginPath();
    pen.arc(x, y, smallPendulumRadius, 0, 2 * Math.PI);
    pen.stroke();

    pen.strokeStyle = "gray";
    pen.lineWidth = lineWidth * 2;
    pen.beginPath();
    pen.moveTo(
      center.x + anchorRadius * Math.sin(pendulum.angle),
      center.y + anchorRadius * Math.cos(pendulum.angle)
    );
    pen.lineTo(x, y);
    pen.stroke();
  });

  // largePendulums.forEach((pendulum) => {
  //   pendulum.update();
  //   const x = pendulum.x + center.x;
  //   const y = pendulum.y + center.y;

  //   pen.strokeStyle = "white";
  //   pen.lineWidth = lineWidth * 4;
  //   pen.beginPath();
  //   pen.arc(x, y, largePendulumRadius, 0, 2 * Math.PI);
  //   pen.stroke();

  //   pen.strokeStyle = "gray";
  //   pen.lineWidth = lineWidth * 2;
  //   pen.beginPath();
  //   pen.moveTo(
  //     center.x + anchorRadius * Math.sin(pendulum.angle),
  //     center.y + anchorRadius * Math.cos(pendulum.angle)
  //   );
  //   pen.lineTo(x, y);
  //   pen.stroke();
  // });

  requestAnimationFrame(draw);
};
draw();
