import bcrypt from 'bcryptjs';

import User from '../models/User';

class AuthController {
    async index(req, res, next) {
        try {
            const user = await User.findByPk(req.userId);

            const { id, nome, email } = user;
            return res.status(200).json({ id, nome, email });
        } catch(e) {
            return res.status(404).json({
                message: e.errors.map(erro => erro.message),
            });
        }
    }

    async show(req, res, next) {
        try {
            const { id: params } = req.params;

            const user = await User.findByPk(params);

            if(!user) {
                return res.status(404).json({
                    message: 'Usuário não existe',
                });
            }

            const { id, nome, email } = user;
            return res.status(200).json({ id, nome, email });
        } catch(e) {
            return res.status(404).json({
                message: e.errors.map(erro => erro.message),
            });
        }
    }

    async store(req, res, next) {
        if(!req.body.nome) {
            return res.status(400).json({
                message: 'É obrigatório enviar o nome',
            });
        }

        if(!req.body.email) {
            return res.status(400).json({
                message: 'É obrigatório enviar o email',
            });
        }

        if(!req.body.password) {
            return res.status(400).json({
                message: 'É obrigatório enviar o password',
            });
        }

        try {
            const body = {
                nome: req.body.nome.trim(),
                email: req.body.email.trim(),
                password: req.body.password,
            };

            const user = await User.create(body);

            const { id, nome, email } = user;
            return res.status(200).json({ id, nome, email });
        } catch(e) {
            return res.status(404).json({
                message: e.errors.map(erro => erro.message),
            });
        }
    }

    async update(req, res, next) {
        try {
            const { userId } = req;

            const user = await User.findByPk(userId);

            if(!user) {
                return res.status(404).json({
                    message: 'Usuário não existe',
                });
            }

            if(req.body.nome) req.body.nome = req.body.nome.trim();
            if(req.body.email) req.body.email = req.body.email.trim();

            if(req.body.password) {
                const salt = bcrypt.genSaltSync();
                req.body.password_hash = bcrypt.hashSync(req.body.password, salt);
            }

            console.log(req.body);

            const novoUser = await user.update(req.body);

            const { id, nome, email } = novoUser;
            return res.status(200).json({ id, nome, email });
        } catch(e) {
            console.log(e);
            return res.status(404).json({
                message: e.errors.map(erro => erro.message),
            });
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if(!user) {
                return res.status(404).json({
                    message: 'Usuário não existe',
                });
            }

            await user.destroy;

            return res.status(200).json({
                message: 'Usuário deletado com sucesso',
            });
        } catch(e) {
            return res.status(404).json({
                message: e.errors.map(erro => erro.message),
            });
        }
    }
}

export default new AuthController();
