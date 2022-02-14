const fs = require("fs");
const path = require("path");

const Canvas = require('canvas')

const generateCertificate = async (req, res) => {
  const { Pre, Id, Name, Email } = req.body;
  const imagePath = path.join(__dirname, "../public/samples/Certificate.jpg");
  const outputPath = path.join(__dirname, `../public/images/${Id}.jpg`);
    
  Canvas.registerFont('./Arial.ttf', { family: 'Arial' });

  const canvas = Canvas.createCanvas(1004, 707)
  const ctx = canvas.getContext('2d')

  Canvas.loadImage(imagePath).then(async (image) => {
    ctx.drawImage(image, 0, 0)
    ctx.font = 'bold 32px Arial'
    ctx.fillText(Pre, 740 - ctx.measureText(Pre).width, 330)
    ctx.font = 'bold 32px Arial'
    ctx.fillText(Name, 720 - ctx.measureText(Name).width, 330)
    ctx.font = 'bold 32px Arial'
    ctx.fillText(Id, 205 - ctx.measureText(Id).width, 330)
    await canvas.createPNGStream().pipe(fs.createWriteStream(outputPath))
    const imgURL = `/images/${Id}.jpg`
    res.render('Certificate', { imgURL })
  })
};

module.exports = {
  generateCertificate,
};
