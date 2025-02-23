import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserValidationPipe } from 'src/users/pipes/create-user-validation.pipe';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/sign-up')
    @UsePipes(CreateUserValidationPipe)
    public async signUp(@Body() body: CreateUserDto): Promise<any> {
        return this.authService.signUp(body);
    }

}
