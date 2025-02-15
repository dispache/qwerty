export class UserEntity {

    public readonly id: number;
    public readonly email: string;
    public readonly login: string;
    public readonly password?: string;
    public readonly firstName: string | null;
    public readonly lastName: string | null;
    public readonly birthDate: string | null;

    constructor(obj: {
        id: number;
        email: string;
        login: string;
        password: string;
        first_name: string | null;
        last_name: string | null;
        birth_date: Date | null;
    }) {
        this.id = obj.id;
        this.email = obj.email;
        this.login = obj.login;
        this.password = obj.password;
        this.firstName = obj.first_name;
        this.lastName = obj.last_name;
        
        if (obj.birth_date) {
            const { birth_date: date } = obj;
            const day: number = date.getDate();
            const month: number = date.getMonth() + 1;
            const year: number = date.getFullYear();
            this.birthDate = `${day < 10 ? '0'+day : day}-${month < 10 ? '0'+month : month}-${year}`;
        } else {
            this.birthDate = null;
        }
    }

}