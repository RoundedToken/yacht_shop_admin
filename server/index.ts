import 'dotenv/config';
import express from 'express';
import { sqlConfig } from './config';
import sql from 'mssql';
import cors from 'cors';
import router from './routes/index';

const PORT = process.env.PORT || 5555;
const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.CORS_ORIGIN,
    })
);
app.use(express.json());
app.use('/api', router);

const start = () => {
    try {
        sql.connect(sqlConfig, (error) => {
            if (error) console.log(error);
            else console.log('DB connected');
        });

        app.listen(+PORT, process.env.ADDRESS || 'localhost', () =>
            console.log(`Server started on ${PORT}`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
