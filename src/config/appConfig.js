import dotenv from 'dotenv';

dotenv.config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

const addrress = `http://${host}:${port}`;

export {
    addrress,
};
