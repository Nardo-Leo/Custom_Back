const express = require("express");
const bodyParser = require("body-parser");
const upload = require("./googleDriveUploader"); 

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/uploadDrive", upload.fields([
  { name: "imagemFrente" },
  { name: "imagemCostas" }
]), async (req, res) => {
  try {
    const files = req.files;

    
    const frente = files.imagemFrente[0].idDrive;
    const costas = files.imagemCostas[0].idDrive;

    res.send({ frente, costas });
  } catch (err) {
    res.status(500).send("Erro no upload pro Drive");
  }
});

module.exports = app;
