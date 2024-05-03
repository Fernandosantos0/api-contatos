import Sequelize, { Model } from 'sequelize';

export default class Contato extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [2, 250],
                        msg: 'O nome precisa ter entre 2 a 250 caracteres',
                    },
                },
            },
            sobrenome: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: 'Email inválido',
                    },
                },
            },
            telefone: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 14],
                        msg: 'O telefone precisa ter entre 6 a 14 caracteres',
                    },
                },
            },
            celular: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 14],
                        msg: 'O celular precisa ter entre 6 a 14 caracteres',
                    },
                },
            },
            whatsapp: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 14],
                        msg: 'O whatsapp precisa ter entre 6 a 14 caracteres',
                    },
                },
            },
        }, {
            sequelize,
            collate: 'utf8mb4_general_ci',
            charset: 'utf8',
            comment: 'Tabela para guardar os contatos',
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' });
        this.hasOne(models.Foto, { foreignKey: 'contato_id' });
    }
}
