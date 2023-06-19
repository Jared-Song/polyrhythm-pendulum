class Pendulum {
  // constructor(arcRadius, radius, gravity, amplitude, period) {
  //   this.arcRadius = arcRadius;
  //   this.radius = radius;
  //   this.angle = 0; // start at vertical axis
  //   this.angularVelocity = (((2 * Math.PI) / period) * amplitude) / 100; // a = (2π/period) * amplitude
  //   this.angularAccel = gravity; // starting accel is same as gravity, change to -gravity to swing to right instead
  //   this.gravity = gravity;
  //   this.x = 0;
  //   this.y = 0;
  // }

  constructor(arcRadius, radius, gravity, angle) {
    this.arcRadius = arcRadius;
    this.radius = radius;
    this.angle = angle;
    this.angularVelocity = 0;
    this.angularAccel = 0;
    this.gravity = gravity;
    this.x = 0;
    this.y = 0;
  }

  update() {
    this.angularAccel =
      ((-1 * this.gravity) / this.radius) * Math.sin(this.angle);
    this.angularVelocity += this.angularAccel;
    this.angle += this.angularVelocity;
    this.x = this.arcRadius * Math.sin(this.angle);
    this.y = this.arcRadius * Math.cos(this.angle);
  }
}
