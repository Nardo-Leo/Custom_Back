const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname + '/dbIcons.json')

function addIcons(newImage) {
 
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }
 
    
    let IconsImgs = [];
    try {
      IconsImgs = JSON.parse(data);
    } catch (parseErr) {
      console.error('Erro ao parsear JSON:', parseErr);
      return;
    }

  
    newImage.id = Number(IconsImgs[(IconsImgs.length)-1].id);
  
    newImage.id = (Number(newImage.id + parseInt(+1)))

    newImage.id = (String(newImage.id))
    
    IconsImgs.push(newImage);

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
