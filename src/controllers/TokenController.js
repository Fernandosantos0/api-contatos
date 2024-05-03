import dotenv from 'dotenv';

import json from 'jsonwebtoken';
import User from '../models/User';

dotenv.config();

class TokenController {
    async store(req, res, next) {
        if(!req.body.email) {
            return res.status(400).json({
                message: 'Email requerido',
            });
        }

        if(!req.body.password) {
            return res.status(400).json({
                message: 'Senha requerida',
            });
        }

        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if(!user) {
                return res.status(404).json({
                    message: 'Usuário não existe',
                });
            }

            if(!(await user.checkPassword(req.body.password))) {
                return res.status(400).json({
                    message: 'Senha inválida',
                });
            }

            /* Criando o token - JSON */
            const { id, email } = user;
            const token = json.sign({ id, email }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION,
            });

            return res.status(200).json({
                token,
            });
        } catch(e) {
            console.log(e);
            return res.status(400).json({
                message: 'Erro',
            });
        }
    }
}

export default new TokenController();
