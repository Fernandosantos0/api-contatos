import dotenv from 'dotenv';
import jsow from 'jsonwebtoken';
import User from '../models/User';

dotenv.config();

export default async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if(!authorization) {
            res.status(403).json({
                message: 'Login required',
            });
        }

        const token = authorization.split(' ').slice(1).toString();

        const dados = jsow.verify(token, process.env.TOKEN_SECRET);

        if(!dados) {
            return res.status(404).json({
                message: 'Token inválido ou expirado',
            });
        }

        /* Veificando se o email foi alterado */
        const checkEmail = await User.findOne({
            where: {
                email: dados.email,
            },
        });

        if(!checkEmail) {
            return res.status(400).json({
                message: 'Login required',
            });
        }

        req.userId = dados.id;
        req.userEmail = dados.email;

        return next();
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            message: 'Token inválido',
        });
    }
};
