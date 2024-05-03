import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'É preciso inserir o nome do usuário',
                    },
                },
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: {
                    msg: 'Este email já foi cadastrado',
                },
                validate: {
                    isEmail: {
                        msg: 'O email é inválido',
                    },
                },
            },

            password: {
                type: Sequelize.VIRTUAL,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 30],
                        msg: 'A senha precisa ter um comprimento de 6 a 30 caracteres',
                    },
                },
            },

            password_hash: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            collate: 'utf8mb4_general_ci',
            charset: 'utf8',
            comment: 'Tabela para guardar as contas do sistema',
        });

        /* Salvando o dado no campo antes de ser construido */
        this.beforeCreate(async (user) => {
            const salt = bcrypt.genSaltSync();
            user.password_hash = bcrypt.hashSync(user.password, salt);
        });

        return this;
    }

    static associate(models) {
        this.hasMany(models.Contato, { foreignKey: 'user_id' });
    }

    async checkPassword(password) {
        return await bcrypt.compare(password, this.password_hash);
    }
}
