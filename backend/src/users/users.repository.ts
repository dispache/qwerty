import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "src/auth/dtos/create-user.dto";

type UserQueryResult = {
    id: number;
    email: string;
    login: string;
    password?: string;
    first_name: string | null;
    last_name: string | null;
    birth_date: Date | null;
    role: string;
};

@Injectable()
export class UsersRepository {

    private readonly defaultUsersQuery: string = `SELECT u.id,u.email,u.login,u.birth_date, 
        u.first_name,u.last_name,r.name as role
        FROM USERS u JOIN roles r on u.role=r.id `;

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    public async getUserByEmail(email: string): Promise<UserEntity | null> {
        const result: UserQueryResult[] = (await this.dataSource.query(
            this.defaultUsersQuery + `where email=$1`,
            [email]
        ));
        return result.length > 0 ? new UserEntity(result[0]) : null;
    }

    public async getUserById(id: number): Promise<UserEntity | null> {
        const result: UserQueryResult[] = (await this.dataSource.query(
            this.defaultUsersQuery + `where u.id=$1`,
            [id]
        ));
        return result.length > 0 ? new UserEntity(result[0]) : null;
    }

    public async getUserByLogin(login: string): Promise<UserEntity | null> {
        const result: UserQueryResult[] = (await this.dataSource.query(
            this.defaultUsersQuery + `where u.login=$1`,
            [login]
        ));
        return result.length > 0 ? new UserEntity(result[0]) : null;
    }

    public async createUser(body: CreateUserDto): Promise<UserEntity> {
        const { email, login, password, firstName, lastName, birthDate } = body;
        const result: UserQueryResult = (await this.dataSource.query(
            `INSERT INTO USERS (email,login,password,first_name,last_name,birth_date,role) values
            ($1,$2,$3,$4,$5,$6,21) RETURNING *`,
            [email, login, password, firstName, lastName, birthDate]
        ))[0];
        return this.getUserById(result.id) as unknown as UserEntity;
    }


}