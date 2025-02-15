import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './user.entity';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) {}

    public async getUserByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepository.getUserByEmail(email);
    }

    public async createUser(body: CreateUserDto): Promise<UserEntity> {
        return this.usersRepository.createUser(body);
    }
}
