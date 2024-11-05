import { Request, Response, Router } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import db from '../../db-config';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import VerifyOTP, { User } from '../middleware/VerifyOTP';
const router = Router();

router.post('/send-otp', async (req: Request, res: Response) => {
    const { email } = req.body;
    const generateOTP = () => {
        const randomBytes = crypto.randomBytes(3);
        const otp = Math.abs(randomBytes.readUIntBE(0, 3) % 1000000);
        return otp.toString().padStart(6, '0');
    }
    
    if(!email) {
        res.status(400).json({ message: "Please input your email" });
        return;
    }

    try {
        const [result] = await db.query<RowDataPacket[]>("SELECT id, email FROM accounts WHERE email = ?", [email]);

        if(!result.length) {
            res.status(400).json({ message: "Email not found" });
            return;
        } 
        
        const [resultOTP] = await db.query<RowDataPacket[]>("SELECT * FROM otp WHERE accountID = ?", [result[0].id]);
        const otp = generateOTP();
        const expiration = new Date(Date.now() + 5 * 60 * 100);


        if (!resultOTP.length) { // Add new otp 
            await db.query<ResultSetHeader>("INSERT INTO otp (otp, expiration, accountID) VALUES (?,?,?)", [otp, expiration, result[0].id]);
            res.status(200).json({ message: "OTP sent successfuly" });
            return;
        } else if (Date.now() > resultOTP[0].expiration) { // Update OTP if expires
            await db.query<ResultSetHeader>("UPDATE otp SET otp = ?, expiration = ? WHERE accountID = ?", [otp, expiration, result[0].id])
            res.status(200).json({ message: "OTP resent successfuly" });
            return;
        } else if (Date.now() < resultOTP[0].expiration || resultOTP.length) { // Check for existing OTP
            res.status(200).json({ message: "OTP already sent" });
            return;
        }

    } catch {
        res.status(500);
    }
});

router.post('/change-password', VerifyOTP, async (req: User, res: Response) => {
    const { password } = req.body;
    const [{ id, email }] = req.user;
    
    if(!password) {
        res.status(400).json({ message: "Please input password" });
        return;
    }

    try {
        const newPassword = await bcrypt.hash(password, 10);
        await db.query<ResultSetHeader>("UPDATE accounts SET password = ? WHERE email = ?", [newPassword, email]);
        await db.query<ResultSetHeader>("DELETE FROM otp WHERE accountID = ?", [id]);
    
        res.status(200).json({ message: "Password updated" });
    } catch {
        res.status(500);
    }
})



export default router;