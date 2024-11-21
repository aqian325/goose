let state = "intro"; // State variable to track the current screen
let gooseBackground; // Variable to store the goose background
let textures = []; // Array to store textures from the folder
let textureNames = ["atmosphere.jpg", "drysoil.jpg", "leaves.jpg"]; // Replace with actual texture file names
let randomTexture; // Variable to hold a random texture

function preload() {
  // Load goose background
  gooseBackground = loadImage("goose.jpeg");

  // Load textures from the textures folder
  for (let i = 0; i < textureNames.length; i++) {
    textures[i] = loadImage("textures/" + textureNames[i]);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  imageMode(CENTER);
  noStroke();

  // Pick a random texture for the next screen
  randomTexture = random(textures);
}

function draw() {
  if (state === "intro") {
    // Intro page: black background with text
    background(0);
    textSize(20);
    fill(255);
    text("glimpse into your past life as a goose", width / 2, height / 2 - 20);
    textSize(18);
    text("click to continue", width / 2, height / 2 + 40);
  } else if (state === "goose") {
    // Goose page with the goose background and "Ready?" text
    drawCenteredImage(gooseBackground);
    textSize(36);
    fill(255);
    text("ready?", width / 2, height / 2);
  } else if (state === "textures") {
    // Textures page with random texture and buttons
    drawCenteredImage(randomTexture);
    drawButton("Back to Intro", 50, height - 100, () => state = "intro");
    drawButton("Credits", width - 150, height - 100, () => state = "credits");
  } else if (state === "credits") {
    // Credits page with a blank background and credits text
    background(255);
    textSize(24);
    fill(0);
    text("Credits: Textures from TextureLabs", width / 2, height / 2);
  }
}

function drawCenteredImage(img) {
  let imgAspect = img.width / img.height;
  let canvasAspect = width / height;

  let drawWidth, drawHeight;

  if (imgAspect > canvasAspect) {
    drawWidth = width;
    drawHeight = width / imgAspect;
  } else {
    drawHeight = height;
    drawWidth = height * imgAspect;
  }

  image(img, (width - drawWidth) / 0.5, (height - drawHeight) / 1, drawWidth, drawHeight);
}

function drawButton(label, x, y, onClick) {
  // Button properties
  let btnWidth = 120;
  let btnHeight = 40;

  // Button background
  fill(0, 0, 0);
  rect(x, y, btnWidth, btnHeight, 5);

  // Button text
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(label, x + btnWidth / 2, y + btnHeight / 2);

  // Check if mouse is pressed on the button
  if (mouseIsPressed && mouseX > x && mouseX < x + btnWidth && mouseY > y && mouseY < y + btnHeight) {
    onClick();
  }
}

function mousePressed() {
  if (state === "intro") {
    // Advance to the goose page
    state = "goose";
  } else if (state === "goose") {
    // Advance to the textures page
    state = "textures";
  }
}
