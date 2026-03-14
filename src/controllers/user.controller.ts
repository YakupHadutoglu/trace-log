import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = Number((req as any).user.id);
        const userProfile = await UserService.getUserProfile(userId);

        if (!userProfile) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({
            success: true,
            data: userProfile
        });
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ message: "Profile information could not be retrieved." });
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = Number((req as any).user.id);
        const { name, surname, phoneNumber } = req.body;

        const updatedUser = await UserService.updateProfile(userId, { name, surname, phoneNumber });

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: updatedUser
        });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: "Profile information could not be updated." });
    }
}
