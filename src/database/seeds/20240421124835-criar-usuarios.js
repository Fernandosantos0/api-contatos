'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync();

    await queryInterface.bulkInsert('users', [
        {
            nome: 'Fernando',
            email: 'fernandomeca7@gmail.com',
            password_hash: bcrypt.hashSync('americalatina', salt),
            created_at: new Date(),
            updated_at: new Date(),
        },

        {
            nome: 'Beatriz',
            email: 'beatrizmeca7@gmail.com',
            password_hash: bcrypt.hashSync('americalatina', salt),
            created_at: new Date(),
            updated_at: new Date(),
        },

        {
            nome: 'Carlos',
            email: 'carlosmeca7@gmail.com',
            password_hash: bcrypt.hashSync('americalatina', salt),
            created_at: new Date(),
            updated_at: new Date(),
        },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
