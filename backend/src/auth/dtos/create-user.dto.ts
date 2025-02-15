export type CreateUserDto = {
    email: string;
    login: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    birthDate: string | null;
};