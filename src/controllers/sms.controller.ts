import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { smsService } from "../services/sms.service";
import Redis from "ioredis";
import { AuthService } from "../services/auth.service";
import { success } from "zod";

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

        const updatedUser = await prisma.user.update({
            where: { id: Number(userId) }, // ID tipine dikkat (Number/String)
            data: { isPhoneVerified: true },
            select: {
                id: true,
                name: true,
                surname: true,
                email: true,
                approvedStatus: true,
                phoneNumber: true,
                isPhoneVerified: true
            }
        });

        await smsService.deleteVerificationCode(userId);

        const sessionData = await AuthService.createSession(updatedUser.id, {
            name: updatedUser.name,
            surname: updatedUser.surname,
            email: updatedUser.email,
            approvedStatus: updatedUser.approvedStatus,
            phoneNumber: updatedUser.phoneNumber,
            isPhoneVerified: true
        });

        res.cookie('accessToken', sessionData.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', sessionData.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie('csrfToken', sessionData.csrf, {
            httpOnly: false, // false so that it can be read in the CSRF header.
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({
            success: true,
            message: "Your phone number has been successfully verified, and you can now create your project."
        });
        console.log("Phone number verified successfully.");
    } catch (error) {
        console.error(`Error in verifPhoneCode: ${error}`);
        res.status(500).json({ message: "Internal server error" })
    }
}
