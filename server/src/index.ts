import express, { Express, Request, Response } from "express";
import cors from 'cors';
import db from "../db-config";
import authentication from './routes/authentication';
import recovery from "./routes/recovery";

const app: Express = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/auth', authentication, recovery);

app.listen(port, async () => {
    const connection = await db.getConnection();

    try {
        if(connection) {
            console.log("Server running");
        }
    } catch(error) {
        connection.release();
    }
})