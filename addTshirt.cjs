const fs = require('fs');
const path = require('path');

  const filePath = path.join(__dirname + '/dbTshirts.json')

function addTshirt(newImage) {
 
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }
 
    
    let TShirtImgs = [];
    try {
      TShirtImgs = JSON.parse(data);
    } catch (parseErr) {
      console.error('Erro ao parsear JSON:', parseErr);
      return;
    }

   
    newImage.id = Number(TShirtImgs[(TShirtImgs.length)-1].id);
    
    newImage.id = (Number(newImage.id + parseInt(+1)))
    
    newImage.id = (String(newImage.id))
    
    TShirtImgs.push(newImage);

    
    fs.writeFile(filePath, JSON.stringify(TShirtImgs, null, 2), 'utf-8', (writeErr) => {
      if (writeErr) {
        console.error('Erro ao escrever no arquivo:', writeErr);
      } else {
        console.log('Imagens adicionadas com sucesso:', newImage);
      }
    });
  });
}



module.exports = {addTshirt};
