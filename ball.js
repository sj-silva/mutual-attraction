class Ball {
  #maxVelocity = 10;
  constructor(x, y, vx, vy, options = {}) {
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(0, 0);

    // Custom mass or generate random mass
    this.mass = options.mass !== undefined ? options.mass : random(2, 5);

    // Custom radius or calculated based on mass
    this.radius =
      options.radius != undefined ? options.radius : sqrt(this.mass) * 10;
  }
  attract(ball) {
    const force = p5.Vector.sub(this.position, ball.position);
    const distanceSq = constrain(force.magSq(), 25, 2500); //5^2=25; 50^2=2500
    const G = 0.5; // Stronger attraction

    let strength = (this.mass * ball.mass * G) / distanceSq;
    strength = constrain(strength, 0.05, 8); // Keep forces realistic
    force.setMag(strength);

    ball.applyForce(force);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  display() {
    stroke(0, 255, 0);
    fill(255, 0, 255);
    strokeWeight(4);
    circle(this.position.x, this.position.y, 2 * this.radius);
  }

  move() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}
