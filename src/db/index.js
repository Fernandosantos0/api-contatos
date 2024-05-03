import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Contato from '../models/Contato';
import Foto from '../models/Foto';

const models = [User, Contato, Foto];

const conexao = new Sequelize(databaseConfig);

models.forEach(model => model.init(conexao));
models.forEach(model => model.associate && model.associate(conexao.models));
