const { createCanvas, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");

const outputDirectory = path.join(__dirname, "avatars");
const canvasSize = 120;
const fontPath = path.join(__dirname, "Proxima Nova Alt Bold.otf");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generateAvatar = async (initials, backgroundColor) => {
  const canvas = createCanvas(canvasSize, canvasSize);
  const context = canvas.getContext("2d");

  // Set background color
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvasSize, canvasSize);

  // Load the font
  registerFont(fontPath, { family: "Proxima Nova" });
  context.font = `${canvasSize / 2}px Proxima Nova`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  // Set text color
  context.fillStyle = "white";

  // Calculate text position
  const x = canvasSize / 2;
  const y = canvasSize / 2;

  // Draw the text (initials)
  context.fillText(initials, x, y);

  // Save the image to a file
  const filename = `${initials}.png`;
  const filePath = path.join(outputDirectory, filename);

  const stream = canvas.createPNGStream();
  const out = fs.createWriteStream(filePath);

  stream.pipe(out);
  return filePath;
};

const generateAvatars = async () => {
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  for (let i = 0; i < alphabet.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      const initials = alphabet[i] + alphabet[j];
      const backgroundColor = "#3eb1c8";
      const filePath = await generateAvatar(initials, backgroundColor);
      console.log(`Generated: ${filePath}`);
    }
  }
};

generateAvatars();
