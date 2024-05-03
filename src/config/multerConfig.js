import { join, extname } from 'path';
import fs from 'fs';
import multer from 'multer';

const aleatorio = function() {
    return Math.floor(Math.random() * 1000000);
};

export default {
    /* Filtrando o tipo de extenção dos arquivos de imagens */
    fileFilter: function(req, file, cb) {
        const extFile = extname(file.originalname);

        if(extFile !== '.jpg' && extFile !== '.png' && extFile !== '.jpeg') {
            cb(new multer.MulterError('O arquivo precisa ser uma .jpg, .jpeg ou .png'), false);
            return;
        }

        cb(null, true);
    },

    /* Configurando o caminho para salvar as imagens */
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            if(!fs.existsSync(join(__dirname, '..', '..', 'uploads'))) {
                fs.mkdirSync(join(__dirname, '..', '..', 'uploads'));
            }

            if(!fs.existsSync(join(__dirname, '..', '..', 'uploads', 'images'))) {
                fs.mkdirSync(join(__dirname, '..', '..', 'uploads', 'images'));
            }

            cb(null, join(__dirname, '..', '..', 'uploads', 'images'));
        },

        filename: function(req, file, cb) {
            cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
        },
    }),
};
