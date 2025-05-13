const fs = require('fs');
const path = require('path');

// Caminho correto do JSON
const filePath = path.join(__dirname + '/dbIcons.json')

//console.log('Caminho do arquivo JSON:', filePath);

// Função para adicionar uma nova imagem
function addIcons(newImage) {
  // Passo 1: Ler o arquivo JSON existente
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }
 
    // Passo 2: Parsear o JSON existente
    let IconsImgs = [];
    try {
      IconsImgs = JSON.parse(data);
    } catch (parseErr) {
      console.error('Erro ao parsear JSON:', parseErr);
      return;
    }

    // Passo 3: Adicionar nova imagem
  
    newImage.id = Number(IconsImgs[(IconsImgs.length)-1].id);
  
    newImage.id = (Number(newImage.id + parseInt(+1)))

    newImage.id = (String(newImage.id))
    
    IconsImgs.push(newImage);

    // Passo 4: Escrever o JSON atualizado
    fs.writeFile(filePath, JSON.stringify(IconsImgs, null, 2), 'utf-8', (writeErr) => {
      if (writeErr) {
        console.error('Erro ao escrever no arquivo:', writeErr);
      } else {
        console.log('Estampas adicionadas com sucesso:', newImage);
      }
    });
  });
}



module.exports = {addIcons};
