const express = require("express");
const bodyParser = require("body-parser");
const upload = require("./googleDriveUploader"); // seu middleware do multer/google drive

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para upload no Google Drive
app.post("/uploadDrive", upload.fields([
  { name: "imagemFrente" },
  { name: "imagemCostas" }
]), async (req, res) => {
  try {
    const files = req.files;

    // Aqui você usa os arquivos enviados ao Google Drive
    const frente = files.imagemFrente[0].idDrive;
    const costas = files.imagemCostas[0].idDrive;

    res.send({ frente, costas });
  } catch (err) {
    res.status(500).send("Erro no upload pro Drive");
  }
});

module.exports = app;
