import { prisma } from '../../config/prisma';

export class UserService {
    static async getUserProfile(userId: number) {
        return await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                surname: true,
                email: true,
                phoneNumber: true,
                approvedStatus: true,
                isPhoneVerified: true,
                createdAt: true,
                _count: {
                    select: { projects: true }
                }
            }
        });

    }
    static async updateProfile(userId: number, updateData: { name?: string, surname?: string, email?: string, phoneNumber?: string }) {;
        return await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                name: true,
                surname: true,
                email: true,
                phoneNumber: true,
            }
        });
    }
}
