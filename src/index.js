import express from 'express';
import dotenv from 'dotenv';
import db from './database/index.js';
import routes from './routes/index.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const HOST = 'localhost';

db.hasConection()

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});