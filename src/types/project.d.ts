declare global {
    namespace Express {
        interface Request {
            project: {
                id: string,
                name: string,
                platform: string,
                useCase: string,
                createdAt: string,
                apiKey: string,
                verificationKeyStatus: boolean
            }
        }
    }
}
