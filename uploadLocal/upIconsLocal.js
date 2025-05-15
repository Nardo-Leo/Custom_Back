const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const { addIcons } = require("../addIcons.cjs");



const app = express();
app.use(fileUpload());


app.post("/addIcons", async (req, res) => {
    try {

  
      const imagePathLogo = req.files.imagemLogo.name;
      const imagePathEstampa = req.files.imagemEstampa.name;
  
  
      const caminhoLogo = (('./imagens/artes/logo/' + imagePathLogo))
      const caminhoEstampa = (( './imagens/artes/estampas/' + imagePathEstampa))
      console.log(caminhoLogo)
      console.log(caminhoEstampa)

      await req.files.imagemLogo.mv(caminhoLogo);
      console.log("Logo passou!!!"); 
  

      await req.files.imagemEstampa.mv(caminhoEstampa);
      console.log("Estampa passou!!!");
  
  

      const newImage = {
  
        caminhoImagemLogo: imagePathLogo,
        caminhoImagemEstampa: imagePathEstampa
      };
  
  
  

      addIcons(newImage);
  
      res.redirect(`https://shimmering-strudel-49ad27.netlify.app/SystemGrafAdmin`)
    } catch (err) {
      console.error('Erro ao mover as estampas:', err);
      res.status(500).send('Erro ao mover as Estampas 2' + err);
    }
  
  
  
  });


  module.exports = app;