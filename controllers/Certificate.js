const fs = require("fs");
const path = require("path");
const {Participant} = require('../models/Participant');
const Canvas = require('canvas')
const nodemailer = require('nodemailer');

const sendEmail = async (Id, Email, outputPath) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EADDRESS,
      pass: process.env.EPASS
    }
  });
  
  const mailOptions = {
    from: process.env.EADDRESS,
    to: Email,
    subject: 'شهادة',
    attachments: [
      {// file on disk as an attachment
        filename: `${Id}.jpg`,
        path: outputPath
      }
    ],
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const generateCertificate = async (req, res) => {
  const { Pre, Id, Name, Email } = req.body;
  const imagePath = path.join(__dirname, "../public/templates/Certificate.jpg");
  const outputPath = path.join(__dirname, `../public/images/${Id}.jpg`);
    
  Canvas.registerFont('./Arial.ttf', { family: 'Arial' });

  const imgURL = `/images/${Id}.jpg`
  const canvas = Canvas.createCanvas(1004, 707)
  const ctx = canvas.getContext('2d')

  const participant = new Participant({
    Pre:Pre,
    Id:Id,
    Name:Name,
    Email:Email.toLowerCase(),
    imgURL:imgURL,
    rating:
      {
        rating1:req.body.Professional,
        rating2:req.body.Informative,
        rating3:req.body.Visually,
      },
  })
  participant.save()
  .then(async () => {
    console.log("done");
    const image = await Canvas.loadImage(imagePath)
    ctx.drawImage(image, 0, 0)
    ctx.font = 'bold 32px Arial'
    ctx.fillText(Pre, 740 - ctx.measureText(Pre).width, 330)
    ctx.font = 'bold 32px Arial'
    ctx.fillText(Name, 720 - ctx.measureText(Name).width, 330)
    ctx.font = 'bold 32px Arial'
    ctx.fillText(Id, 205 - ctx.measureText(Id).width, 330)
    const writeStream = fs.createWriteStream(outputPath)
    canvas.createPNGStream().pipe(writeStream)
    writeStream.on('finish', () => {
      console.log('The PNG file was created.')
      
      // sendEmail(Id, Email, outputPath)
      
      res.redirect(`/certificate/${Id}`)
    })
  })
  .catch((err) => {
    // console.log("error");
    res.send("تم تسجيل هذا المشارك من قبل");
  })
};

module.exports = {
  generateCertificate,
};
