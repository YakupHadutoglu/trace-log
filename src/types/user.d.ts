export interface CreateUserDto {
    name: string;
    surname: string;
    email: string;
    password: string;
    approvedStatus: boolean;
}
