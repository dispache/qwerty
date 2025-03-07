import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { UserValidationPipe } from "./user-validation.pipe";
import { CreateUserDto } from "src/auth/dtos/create-user.dto";

export class CreateUserValidationPipe extends UserValidationPipe implements PipeTransform {
    transform(value: CreateUserDto, metadata: ArgumentMetadata) {
        const errors: string[] = this.checkRequiredFields(value);
        if (errors.length > 0) {
            throw new BadRequestException({
                errors
            });
        }
        errors.push(...this.checkFieldsType(value));
        if (errors.length > 0) {
            throw new BadRequestException({
                errors
            });
        }

        errors.push(...[
            ...this.checkEmailField(value.email), ...this.checkLoginField(value.login), 
            ...this.checkPasswordField(value.password), ...this.checkFirstNameField(value.firstName),
            ...this.checkLastNameField(value.lastName), ...this.checkBirthDateField(value.birthDate)
        ]);

        if (errors.length > 0) {
            throw new BadRequestException({
                errors
            });
        }
        
        return value;
    }
}