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
 
        const pathFront = ((__dirname + '../../imagens/camisas/frente/'+imagePathFrente))
        const pathBack = ((__dirname + '../../imagens/camisas/costas/' + imagePathCostas))
        //D:\Projetos\Grafica\Back\imagens\camisas\frente
        
        
        // Mover a imagem da frente
      await req.files.imagemFrente.mv(pathFront);
      console.log("Frente passou!!!");

      // Mover a imagem das costas
      await req.files.imagemCostas.mv(pathBack);
      console.log("Costas passou!!!");


      // Criar objeto com os dados da camiseta
      const newImage = {

         // nome: req.body.name,
          modelo: req.body.modelo,
          cor: req.body.cor,
          caminhoImagemFrente: imagePathFrente,
          caminhoImagemCostas: imagePathCostas
      };


      

      // Adicionar ao JSON
      addTshirt(newImage);

      res.redirect('http://localhost:5173/SystemGrafAdmin')
  } catch (err) {
      console.error('Erro ao mover as  das camisas:', err);
      res.status(500).send('Erro ao mover as imagens das camisas 2' + err);
  }

 
  
});

module.exports = app;
