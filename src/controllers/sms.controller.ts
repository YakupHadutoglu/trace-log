import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { smsService } from "../services/sms.service";
import Redis from "ioredis";

export const sendPhoneVerification = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { phoneNumber } = req.body;

        if (!phoneNumber) return res.status(400).json({ message: "Phone number is required" });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await smsService.saveSmsVerificationCode(userId, code);

        console.log(`Verifification code for ${phoneNumber}: ${code}`);

        res.json({ message: "Verification code sent and plase control the consol" });
    } catch (error) {
        console.error(`Error in sendPhoneVerification: ${error}`);
        res.status(500).json({ message: "Internal server error" });

    }
}

export const verifyPhoneCode = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { code } = req.body;

        const storedCode = await smsService.getVerificationCode(userId);

        if (!storedCode) return res.status(400).json({ message: "No Verification code found and time the expired" });

        if (storedCode !== code) return res.status(400).json({ message: "Invalid verification code" })

        await prisma.user.update({
            where: { id: userId },
            data: { isPhoneVerified: true }
        });

        await smsService.deleteVerificationCode(userId);
        res.status(200).json({ message: "Your phone number has been successfully verified, and you can now create your project." });
        console.log("Phone number verified successfully.");
    } catch (error) {
        console.error(`Error in verifPhoneCode: ${error}`);
        res.status(500).json({ message: "Internal server error" })
    }
}
