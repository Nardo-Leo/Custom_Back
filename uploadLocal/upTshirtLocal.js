const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const { addTshirt } = require("../addTshirt.cjs");



const app = express();
app.use(fileUpload());

// Rota para upload local
app.post("/addTshirt", async (req, res) => {
  try {
      
     

      const imagePathFrente = req.files.imagemFrente.name;
      const imagePathCostas = req.files.imagemCostas.name;
  

      console.log('caminho frenrte: ' + imagePathFrente)
      console.log('caminho costas: ' + imagePathCostas)
 
        const pathFront = (('./imagens/camisas/frente/'+imagePathFrente))
        const pathBack = (( './imagens/camisas/costas/' + imagePathCostas))
        
        
        
       
      await req.files.imagemFrente.mv(pathFront);
  
      await req.files.imagemCostas.mv(pathBack);
      



      const newImage = {

         
          modelo: req.body.modelo,
          cor: req.body.cor,
          caminhoImagemFrente: imagePathFrente,
          caminhoImagemCostas: imagePathCostas
      };


      

      
      addTshirt(newImage);

      res.redirect(`https://shimmering-strudel-49ad27.netlify.app/SystemGrafAdmin`)
  } catch (err) {
      console.error('Erro ao mover as  das camisas:', err);
      res.status(500).send('Erro ao mover as imagens das camisas 2' + err);
  }

 
  
});

module.exports = app;
