let balls = [];
let sun;

function setup() {
  // Use windowWidth and windowHeight to create a responsive canvas
  const canvasWidth = min(720, windowWidth * 0.95);
  const canvasHeight = min(540, windowHeight * 0.7);

  createCanvas(canvasWidth, canvasHeight);

  const maxAttempts = 100; // Prevent infinite loop
  const minDistance = 80; // Minimum distance between ball centers
  const totalBalls = 10;
  sun = new Ball(width / 2, height / 2, 0, 0, { mass: 10, radius: 50 });

  let attempts = 0;
  while (balls.length < totalBalls && attempts < maxAttempts) {
    let pos = p5.Vector.random2D();
    let veloc = createVector(-pos.y, pos.x);
    pos.setMag(random(150, 250)).add(width / 2, height / 2);

    // Check for overlaps only if balls array is not empty
    const canPlace =
      balls.length === 0 ||
      !balls.some((existingBall) => {
        let distance = dist(
          pos.x,
          pos.y,
          existingBall.position.x,
          existingBall.position.y
        );
        return distance < minDistance;
      });

    // If no overlap, add the ball
    if (canPlace) {
      balls.push(new Ball(pos.x, pos.y, veloc.x, veloc.y));
    }

    attempts++; // Increment attempts
  }

  // Optional: Warn if couldn't place all balls
  if (balls.length < totalBalls) {
    console.warn(`Could only place ${balls.length} out of ${totalBalls} balls`);
  }
}

// Add a function to handle window resizing
function windowResized() {
  const canvasWidth = min(800, windowWidth * 0.95);
  const canvasHeight = min(600, windowHeight * 0.7);
  resizeCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(25);

  for (let ball of balls) {
    sun.attract(ball);
    for (let otherBall of balls) {
      if (otherBall !== ball) {
        ball.attract(otherBall);
      }
    }
  }

  for (let ball of balls) {
    ball.move();
    ball.display();
  }
}
