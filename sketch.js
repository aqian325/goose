let state = "intro"; 
let gooseBackground, gooseFeetOverlay, geeseFlight; 
let textures = []; 
let textureNames = [
  "ripples.jpg",
  "drysoil.jpg",
  "atmosphere.jpg",
  "leaves.jpg",
  "moss.jpg",
  "pebbles.jpg",
  "shadows.jpg",
  "clouds2.jpg",
  "lens1.jpg"
];
let randomTexture; 
let livesAgo; 
let fadeAmount = 0; // For gradual fade-in

function preload() {
  gooseBackground = loadImage("goose.jpeg");
  gooseFeetOverlay = loadImage("goosefeet.png"); 
  geeseFlight = loadImage("geeseflight2.png");

  for (let i = 0; i < textureNames.length; i++) {
    textures[i] = loadImage("textures/" + textureNames[i]);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  noStroke();
}

function draw() {
  if (state === "intro") {
    background(0);
    textSize(40);
    textFont("Gaegu");
    fill(100);
    drawImageAtBottom(geeseFlight, 1);
    text("glimpse into your past life", width / 2, height / 2 - 45);
    text("as a goose", width / 2, height / 2);
    textSize(14);
    text("click to continue", width / 2, height - 100);
  } else if (state === "goose") {
    drawCenteredImage(gooseBackground);
    textSize(36);
    fill(255);
    text("ready?", width / 2, height / 2);
  } else if (state === "textures") {
    background(0); // Ensure the background is redrawn
    tint(255, fadeAmount); // Apply fading effect to images
    drawCenteredImage(randomTexture); // Draw the random texture
    drawImageAtBottom(gooseFeetOverlay, 0.4);

    noTint(); // Reset tint for text and other elements
    textSize(24);
    fill(255, fadeAmount); // Apply fading effect to text

    if (randomTexture === textures[textureNames.indexOf("lens1.jpg")]) {
      text("you have never been a goose in a past life.", width / 2, height / 2);
      text("maybe next time.", width / 2, height / 2 + 30);
    } else {
      text("this was your last memory as a goose", width / 2, height / 2);
      text(`you were a goose ${livesAgo} lives ago`, width / 2, height / 2 + 30);
    }

    drawButton("back to intro", 50, height - 100, () => state = "intro");
    drawButton("save", width - 150, height - 100, saveGooseLife);

    // Increment fadeAmount to create the fade-in effect
    if (fadeAmount < 255) {
      fadeAmount += 3; // Adjust the increment speed for smoother transitions
    }
  }
}

function drawImageAtBottom(img, scaleFactor) {
  let scaledWidth = img.width * scaleFactor;
  let scaledHeight = img.height * scaleFactor;

  let x = (width - scaledWidth) / 2;
  let y = height - scaledHeight;

  image(img, x, y, scaledWidth, scaledHeight);
}

function drawCenteredImage(img, scaleFactor = 1) {
  let imgAspect = img.width / img.height;
  let canvasAspect = width / height;

  let drawWidth, drawHeight;

  if (imgAspect > canvasAspect) {
    drawWidth = width * scaleFactor * 5;
    drawHeight = (width * scaleFactor * 5) / imgAspect;
  } else {
    drawHeight = height * scaleFactor * 5;
    drawWidth = (height * scaleFactor * 5) * imgAspect;
  }

  image(img, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

function drawButton(label, x, y, onClick) {
  let btnWidth = 120;
  let btnHeight = 40;

  fill(0, 0, 0);
  rect(x, y, btnWidth, btnHeight, 5);

  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(label, x + btnWidth / 2, y + btnHeight / 2);

  if (mouseIsPressed && mouseX > x && mouseX < x + btnWidth && mouseY > y && mouseY < y + btnHeight) {
    onClick();
  }
}

function saveGooseLife() {
  saveCanvas('gooselife', 'jpg');
}

function mousePressed() {
  if (state === "intro") {
    state = "goose";
  } else if (state === "goose") {
    randomTexture = random(textures); 
    livesAgo = Math.floor(random(2, 14)); 
    fadeAmount = 0; // Reset fadeAmount for new transition
    state = "textures";
  }
}
