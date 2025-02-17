import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {}

    public async signUp(body: CreateUserDto): Promise<any> {
        let user = await this.usersService.getUserByEmail(body.email);
        if (user) {
            throw new BadRequestException('Email is used');
        }
        user = await this.usersService.getUserByLogin(body.login);
        if (user) {
            throw new BadRequestException('Login is used');
        }
        const createdUser: UserEntity = await this.usersService.createUser(body);
        return createdUser;
    }
}
