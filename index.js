import dotenv from 'dotenv';
import colors from 'colors';
import app from './app';

dotenv.config();

const port = process.env.PORT || 4000;
const host = process.env.HOST || 'localhost';
app.listen(port, host, () => {
    console.log('API REST - Contatos'.blue.bold);
    console.log(`Server ON - http://${host}:${port}`.green.bold);
});
