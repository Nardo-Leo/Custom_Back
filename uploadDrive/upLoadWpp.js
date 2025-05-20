
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const upload = require("./googleDriveUploader"); 

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());


const multer = require("multer");
const upload = multer({ dest: "uploads/" });



app.post(
    "/upload",
  
    (req, res, next) => {
      upload.single("image")(req, res, err => {
        if (err) {
          console.error("Multer falhou:", err);
          return res.status(500).json({ error: err.message });
        }
        next(); 
      });
    },
    
    async (req, res) => {
      try {
        console.log(" ENTROU NO POST DRIVE");
        console.log("req.file:", req.file);
  
        const imagePath = req.file.path;
        const fileName = req.file.originalname;
        const imageUrl = await uploadToDrive(imagePath, fileName);
  
        
        fs.unlinkSync(imagePath);
  
        return res.status(200).json({ url: imageUrl });
      } catch (error) {
        console.error("Erro ao fazer upload:", error);
        return res.status(500).json({ error: error.message });
      }
    }
  );


  module.exports = app;