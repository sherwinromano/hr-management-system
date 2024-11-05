import { Request , Response, NextFunction } from "express";
import db from "../../db-config";
import { RowDataPacket } from "mysql2";

export type User = Request & {
    user?: any;
}

const VerifyOTP = async (req: User, res: Response, next: NextFunction) => {
    const { otp } = req.body;

    if(!otp) {
        res.status(400).json({ message: "Please input otp" });
        return;
    }

    try {
        const [result] = await db.query<RowDataPacket[]>("SELECT * FROM otp WHERE otp = ?", [otp]);
        
        if(!result.length) {
            res.status(404).json({ message: "Invalid OTP" });
            return;
        } else if(Date.now() > result[0].expiration) {
            res.status(400).json({ message: "OTP is expired, please send an email again" });
            return;
        } 

        const [resultUser] = await db.query<RowDataPacket[]>("SELECT * FROM accounts WHERE id = ?", [result[0].accountID]);
       
        req.user = resultUser;
        next();
    } catch {
        res.status(500);
    }
}

export default VerifyOTP;