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
  
  
      const caminhoLogo = ((__dirname + '../../imagens/artes/logo/' + imagePathLogo))
      const caminhoEstampa = ((__dirname + '../../imagens/artes/estampas/' + imagePathEstampa))
      console.log(caminhoLogo)
      console.log(caminhoEstampa)

      // Mover a imagem da frente
      await req.files.imagemLogo.mv(caminhoLogo);
      console.log("Logo passou!!!"); 
  
      // Mover a imagem das costas
      await req.files.imagemEstampa.mv(caminhoEstampa);
      console.log("Estampa passou!!!");
  
  
      // Criar objeto com os dados da camiseta
      const newImage = {
  
        /* nome: req.body.name,
         modelo: req.body.modelo,
         cor: req.body.cor, */
        caminhoImagemLogo: imagePathLogo,
        caminhoImagemEstampa: imagePathEstampa
      };
  
  
  
      // Adicionar ao JSON
      addIcons(newImage);
  
      res.redirect('http://localhost:5173/SystemGrafAdmin')
    } catch (err) {
      console.error('Erro ao mover as estampas:', err);
      res.status(500).send('Erro ao mover as Estampas 2' + err);
    }
  
  
  
  });


  module.exports = app;