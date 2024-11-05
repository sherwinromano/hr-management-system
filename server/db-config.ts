import mysql, { PoolOptions } from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

const pool: PoolOptions = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}

const db = mysql.createPool(pool);

export default db;