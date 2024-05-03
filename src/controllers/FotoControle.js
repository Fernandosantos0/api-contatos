import multer from 'multer';

import Contato from '../models/Contato';
import Foto from '../models/Foto';

/* Importando o arquivo de configuração */
import multerConfig from '../config/multerConfig';

/* Configurando o upload */
const upload = multer(multerConfig).single('foto');

class FotoControle {
    store(req, res, next) {
        upload(req, res, async err => {
            if(err) {
                console.error(err);
                return res.status(500).json({
                    messsage: err.code,
                });
            }

            try {
                const { originalname, filename } = req.file;
                let { contato_id } = req.body;
                contato_id = Number.parseInt(contato_id);

                const isContato = await Contato.findOne({
                    where: {
                        id: Number.parseInt(contato_id),
                        user_id: Number.parseInt(req.userId),
                    },
                });

                if(!isContato) {
                    return res.status(400).json({
                        message: 'O contato não existe',
                    });
                }

                const foto = await Foto.create({ originalname, filename, contato_id });

                return res.status(201).json(foto);
            } catch(e) {
                console.error(e);
                return res.status(404).json({
                    message: 'Não foi possível salvar a foto no banco de dados',
                });
            }
        });
    }
}

export default new FotoControle();
