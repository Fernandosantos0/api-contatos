import Contato from '../models/Contato';
import Foto from '../models/Foto';

class ContatoController {
    async index(req, res, next) {
        try {
            let order = 'ASC';
            if(req.query.order === 'new') order = 'ASC';
            if(req.query.order === 'old') order = 'DESC';

            const contatos = await Contato.findAll({
                where: {
                    user_id: req.userId,
                },
                attributes: ['id', 'nome', 'sobrenome', 'email', 'telefone', 'celular', 'whatsapp'],
                order: [
                    ['created_at', order],
                ],
                include: Foto,
            });

            if(!contatos) {
                return res.status(200).json({
                    message: 'Não existe nenhum contato cadastrado',
                });
            }

            return res.status(200).json(contatos);
        } catch(e) {
            return res.status(404).json({
                message: e.errors.map(erro => erro.message),
            });
        }
    }

    async store(req, res, next) {
        if(!req.body.nome) {
            return res.status(400).json({
                message: 'O nome é requirido',
            });
        }

        if(!req.body.email) {
            return res.status(400).json({
                message: 'O email é requirido',
            });
        }

        if(!req.body.telefone) {
            return res.status(400).json({
                message: 'O telefone é requirido',
            });
        }

        if(!req.body.celular) {
            return res.status(400).json({
                message: 'O celular é requirido',
            });
        }

        if(!req.body.whatsapp) {
            return res.status(400).json({
                message: 'O whatsapp é requirido',
            });
        }

        if(!req.body.user_id) {
            return res.status(400).json({
                message: 'Login required',
            });
        }

        try {
            req.body.user_id = Number(req.body.user_id);
            const contato = await Contato.create(req.body);

            const { id, nome, sobrenome, email, telefone, celular, whatsapp } = contato;
            return res.status(201).json({ id, nome, sobrenome, email, telefone, celular, whatsapp });
        } catch(e) {
            return res.status(404).json({
                message: 'ID do usuário inválido',
            });
        }
    }

    async show(req, res, next) {
        try {
            const contato = await Contato.findOne({
                where: {
                    id: Number(req.params.id),
                    user_id: Number(req.userId),
                },
                attributes: ['id', 'nome', 'sobrenome', 'email', 'telefone', 'celular', 'whatsapp'],
            });

            if(!contato) {
                return res.status(400).json({
                    message: 'O contato não existe',
                });
            }

            return res.status(200).json(contato);
        } catch(e) {
            return res.status(404).json({
                message: e.errors.map(erro => erro.message),
            });
        }
    }

    async update(req, res, next) {
        try {
            const contato = await Contato.findOne({
                where: {
                    id: Number(req.params.id),
                    user_id: Number(req.userId),
                },
            });

            if(!contato) {
                return res.status(400).json({
                    message: 'O contato não existe',
                });
            }

            await Contato.update(req.body, {
                where: {
                    id: Number(req.params.id),
                    user_id: Number(req.userId),
                },
            });

            const contatoAtualizado = await Contato.findOne({
                where: {
                    id: Number(req.params.id),
                    user_id: Number(req.userId),
                },
                attributes: ['id', 'nome', 'sobrenome', 'email', 'telefone', 'celular', 'whatsapp'],
            });

            return res.status(200).json(contatoAtualizado);
        } catch(e) {
            return res.status(404).json({
                message: e.errors.map(erro => erro.message),
            });
        }
    }

    async delete(req, res, next) {
        try {
            const contato = await Contato.findOne({
                where: {
                    id: Number(req.params.id),
                    user_id: Number(req.userId),
                },
            });

            if(!contato) {
                return res.status(400).json({
                    message: 'O contato não existe',
                });
            }

            await Contato.destroy({
                where: {
                    id: Number(req.params.id),
                    user_id: Number(req.userId),
                },
            });

            return res.status(200).json({
                message: 'Contato apagado com sucesso',
            });
        } catch(e) {
            return res.status(404).json({
                message: e.errors.map(erro => erro.message),
            });
        }
    }
}

export default new ContatoController();
