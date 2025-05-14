const express = require("express");
const cors = require("cors");


const upTshirLocal = require('./uploadLocal/upTshirtLocal.js')
const upIconsLocal = require('./uploadLocal/upIconsLocal.js')


const path = require("path");

const fs = require('fs');



//Para sessão do admin
const session = require('express-session')
const bodyParser = require('body-parser')
//




//Para Upload pelo Google Drive
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const uploadToDrive = require('./UploadDrive');
//const { Script } = require("vm");
/****** */

const app = express();

app.use(express.json());
app.use(cors());


const port = process.env.PORT || 3000;





app.use(session({ secret: '1233' }))
app.use(bodyParser.urlencoded({ extended: true }))






app.use('/imgsCamisas', express.static(path.join(__dirname + '/imagens/camisas/frente/')));
app.use('/imgsCostas', express.static(path.join(__dirname + '/imagens/camisas/costas/')));
app.use('/imgsIcons', express.static(path.join(__dirname + '/imagens/artes/logo/')));
app.use('/imgsEstampas', express.static(path.join(__dirname + '/imagens/artes/estampas/')));


app.post("/addIcons",upIconsLocal)
app.post("/addTshirt",upTshirLocal)


app.get('/', (req,res)=>{
  res.render('Camisas Personalizadas')
})




app.get('/dbcamisas', (req, res) => {
  const dbPath = path.join(__dirname + '/dbTshirts.json');
  // console.log('o dbpath :...+ ' + dbPath)

  try {
    const dbData = fs.readFileSync(dbPath, 'utf-8');
    const camisas = JSON.parse(dbData);
    res.json(camisas);
  } catch (error) {
    console.error('Erro ao ler o arquivo dbTshirt.json:', error);
    res.status(500).json({ error: 'Erro ao ler os dados das camisas.' });
  }
});


app.get('/dbicones', (req, res) => {
  const dbPath = path.join(__dirname + '/dbIcons.json');
  // console.log('o dbpath :...+ ' + dbPath)

  try {
    const dbData = fs.readFileSync(dbPath, 'utf-8');
    const icones = JSON.parse(dbData);
    res.json(icones);
  } catch (error) {
    console.error('Erro ao ler o arquivo dbTshirt.json:', error);
    res.status(500).json({ error: 'Erro ao ler os dados dos icones.' });
  }
});


//Sessão do admin- inicio


const acesso = process.env.LOGIN
const senha = process.env.PASSWORD

app.post('/login', (req, res) => {

  
  if ((req.body.email == acesso) && (req.body.senha == senha)) {
    res.redirect('http://localhost:5173/SystemGrafAdmin')
  } else {
    res.redirect('http://localhost:5173/loginError')

  }

})


//Sessao do admin- fim



//Upload


app.post("/add", (req, res) => {
  console.log("Recebido:", req.body); // 👀 Verificar os dados recebidos

  addImage(req.body);

  res.json({ mensagem: "Imagem Adicionada" });
});



app.post(
  "/upload",
  // 1) Primeiro middleware: envelopa o multer e captura erros
  (req, res, next) => {
    upload.single("image")(req, res, err => {
      if (err) {
        console.error("Multer falhou:", err);
        return res.status(500).json({ error: err.message });
      }
      next(); // nenhum erro → vai para o próximo
    });
  },
  // 2) Segundo middleware: seu handler real
  async (req, res) => {
    try {
      console.log(" ENTROU NO POST DRIVE");
      console.log("req.file:", req.file);

      const imagePath = req.file.path;
      const fileName = req.file.originalname;
      const imageUrl = await uploadToDrive(imagePath, fileName);

      // Apaga o arquivo local
      fs.unlinkSync(imagePath);

      return res.status(200).json({ url: imageUrl });
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);





module.exports = app;
