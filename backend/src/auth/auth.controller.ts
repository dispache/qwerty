import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/sign-up')
    public async signUp(@Body() body: CreateUserDto): Promise<any> {
        return this.authService.signUp(body);
    }

}
