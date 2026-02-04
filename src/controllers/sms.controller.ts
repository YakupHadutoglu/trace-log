import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { smsService } from "../services/sms.service"; // Servis importu
import { AuthService } from "../services/auth.service";

export const sendPhoneVerification = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const phoneNumber = req.body.phoneNumber || (req as any).user.phoneNumber;

        if (!phoneNumber) return res.status(400).json({ message: "Phone number is required" });

        await smsService.generateAndSaveCode(userId, phoneNumber);

        res.json({ message: "Verification code sent. Please check console." });
    } catch (error) {
        console.error(`Error in sendPhoneVerification: ${error}`);
        // headers check
        if (!res.headersSent) res.status(500).json({ message: "Internal server error" });
    }
}

export const verifyPhoneCode = async (req: Request, res: Response) => {
    try {

        const userId = (req as any).user.id;
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ message: "Code is required" });
        }

        const storedCode = await smsService.getVerificationCode(String(userId));

        if (!storedCode) {
            return res.status(400).json({ message: "Code expired or not found" });
        }

        if (storedCode !== code) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(userId) },
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

        await smsService.deleteVerificationCode(String(userId));

        const sessionData = await AuthService.createSession(updatedUser.id, {
            id: updatedUser.id,
            name: updatedUser.name,
            surname: updatedUser.surname,
            email: updatedUser.email,
            approvedStatus: updatedUser.approvedStatus,
            phoneNumber: updatedUser.phoneNumber,
            isPhoneVerified: true
        });

        res.cookie("accessToken", sessionData.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", sessionData.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie("csrfToken", sessionData.csrf, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Phone verified successfully."
        });

    } catch (error) {
        console.error(`Error: ${error}`);
        if (!res.headersSent) res.status(500).json({ message: "Internal server error" });
    }
}
