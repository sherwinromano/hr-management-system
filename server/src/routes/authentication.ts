import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import db from '../../db-config';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

dotenv.config();

const router = Router();

type Login = {
    email: string;
    password: string;
}

type Register = Login & {
    confirmPassword: string;
}

router.post('/login', async (req: Request, res: Response) => {
    const { email, password }: Login = req.body;
    
    if(!email || !password) {
        res.status(400).json({ message: "Please input values" });
    }

    try {
        const [result] = await db.query<RowDataPacket[]>("SELECT * FROM accounts WHERE email = ?", [email]);

        if(!result.length) {
            res.status(400).json({ message: "Invalid email" });
            return;
        }

        const isMatchedPassword = await bcrypt.compare(password, result[0].password);
       
        if (!isMatchedPassword) {
            res.status(400).json({ message: "Invalid password"});
            return;
        }

        const token = jwt.sign({ id: result[0].id }, process.env.TOKEN_KEY as string , { expiresIn: "7d"});
        
        res.cookie("token", token, { httpOnly: true, secure: true })
        res.status(200).json({ message: "Login successfuly" });
    } catch {
        res.status(500);
    }
});

router.post('/register', async (req: Request, res: Response) => {
    const { email, password, confirmPassword }: Register = req.body;

    if(!email || !password || !confirmPassword) {
        res.status(400).json({ message: "Please input values "});
    }

    try {
        const [result] = await db.query<RowDataPacket[]>("SELECT email FROM accounts WHERE email = ?", [email])
        
        if(result.length == 1) {
            res.status(409).json({ message: "Email is already taken" });
            return;
        } else if (password !== confirmPassword) {
            res.status(409).json({ message: "Password not match" });
            return;
        }
        
        const dbPassword = await bcrypt.hash(password, 10);

        await db.query<ResultSetHeader>("INSERT INTO accounts (email, password) VALUES (?,?)", [email, dbPassword]);

        res.status(201).json({ message: "Account created successfuly" })
    } catch(error) {
        res.status(500);
    }
})


export default router;