const fs = require('fs')
const { google } = require('googleapis')
const path = require('path')



const Google_Api_Folder_Id = process.env.Google_Api_Folder_Id

//const Cred_Google = process.env.Cred_Google

const Credencial = JSON.parse(process.env.Cred_Google)
const Cred_Google = Credencial.replace(/\\n/g, '\n')

console.log("AQUI ESTÁ ==>>..."+Cred_Google)
 
const auth = new google.auth.GoogleAuth({
    //keyFile: Cred_Google
    credentials: Cred_Google,
    scopes: ['https://www.googleapis.com/auth/drive']
})

const drive = google.drive({
    version: 'v3',
    auth
})

async function UploadToDrive(filePath, fileName) {

    try {
        

        

        const fileMetaData = {
            'name': fileName,
            'parents': [Google_Api_Folder_Id]
        }

        const media = {
            mimeType: 'image/png',
            body: fs.createReadStream(filePath) //Aqui o caminho da imagem
        }

        const response = await drive.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        })
        

        await drive.permissions.create({
            fileId: response.data.id,
            requestBody:{
                role: 'reader',
                type: 'anyone'
            }
        })

        return `https://drive.google.com/uc?id=${response.data.id}`;
    }catch(err){
        console.error("Erro ao fazer upload para o Google Drive:", err);
        throw new Error("Erro ao fazer upload para o Google Drive.");
    }
    
}


module.exports = UploadToDrive;

