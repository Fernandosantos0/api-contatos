import Sequelize, { Model } from 'sequelize';
import { addrress } from '../config/appConfig';

export default class Foto extends Model {
    static init(sequelize) {
        super.init({
            originalname: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'O campo originalneme é obrigatório',
                    },
                },
            },
            filename: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'O campo filename é obrigatório',
                    },
                },
            },
            url: {
                type: Sequelize.VIRTUAL,
                allowNull: false,
                get() {
                    return `${addrress}/images/${this.getDataValue('filename')}`;
                },
            },
        }, {
            sequelize,
            collate: 'utf8mb4_general_ci',
            charset: 'utf8',
            comment: 'Tabela para guardar as fotos do contato',
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Contato, { foreignKey: 'contato_id' });
    }
}
