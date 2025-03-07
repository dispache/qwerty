import { CreateUserDto } from "src/auth/dtos/create-user.dto";

export abstract class UserValidationPipe {
    
    private readonly fieldsTypes = {
        email: 'string',
        login: 'string',
        password: 'string',
        firstName: 'string', 
        lastName: 'string',
        birthDate: 'string'
    };
    private readonly requiredFields = new Set(['email', 'login', 'password']);

    checkFieldsType(body: CreateUserDto): string[] {
        const errors: string[] = [];
        
        Object.keys(body).forEach(key => {
            const requiredType: string = this.fieldsTypes[key];
            const passedType: string = typeof body[key];
            const fieldIsRequired = this.requiredFields.has(key);

            if (!fieldIsRequired && body[key] === null) {
                return;
            }
            if (requiredType !== passedType) {
                errors.push(`Field '${key}' should be type of '${this.fieldsTypes[key]}'`);
            }

        });

        return errors;
    }

    checkRequiredFields(body: CreateUserDto): string[] {
        const errors: string[] = [];
        const passedFields = new Set(Object.keys(body));
        this.requiredFields.forEach(field => {
            if (!passedFields.has(field)) {
                errors.push(`'${field}' field is required`);
            }
        });
        return errors;
    }

    checkEmailField(email: string): string[] {
        const errors: string[] = [];
        
        const minLength = 5, maxLength = 35;
        const emailLength = email.length;
        if (emailLength < minLength || emailLength > maxLength) {
            errors.push(`Email length should be from ${minLength} to ${maxLength} symbols`);
        }

        const emailPattern = /^[a-z_\.0-9]{1,31}@[a-z]+\.[a-z]+$/;
        if (!emailPattern.test(email)) {
            errors.push('Invalid email');
        }

        return errors;
    }

    checkLoginField(login: string): string[] {
        const errors: string[] = [];

        const minLength = 3, maxLength = 35;
        const loginLength = login.length;
        if (loginLength < minLength || loginLength > maxLength) {
            errors.push(`Login length should be from ${minLength} to ${maxLength} symbols`);
        }

        const loginPattern = /^[a-zA-Z0-9_]+$/;
        if (!loginPattern.test(login)) {
            errors.push("Invalid login. Please use letters, numbers or '_' symbol");
        }

        return errors;
    }

    checkPasswordField(password: string): string[] {
        const errors: string[] = [];
        
        const minLength = 4, maxLength = 35;
        const passwordLength = password.length;
        if (passwordLength < minLength || passwordLength > maxLength) {
            errors.push(`Password length should be from ${minLength} to ${maxLength} symbols`);
        }
        
        return errors;
    }

    checkNamesFields(type: string, name: string): string[] {
        const errors: string[] = [];

        const minLength = 1, maxLength = 20;
        const nameLength = name.length;
        if (nameLength < minLength || nameLength > maxLength) {
            errors.push(`${type} name length should be from ${minLength} to ${maxLength} symbols`);
        }

        const namePattern = /^[a-zA-Z]+$/;
        if (!namePattern.test(name)) {
            errors.push(`Invalid ${type} name. Please use only letters`);
        }

        return errors;
    }

    checkFirstNameField(firstName: string | null): string[] {
        return firstName ? this.checkNamesFields('first', firstName) : [];
    }

    checkLastNameField(lastName: string | null): string[] {
        return lastName ? this.checkNamesFields('last', lastName) : [];
    }

    checkBirthDateField(birthDate: string | null): string[] {
        if (!birthDate) {
            return [];
        }

        const errors: string[] = [];
        
        const birthDatePattern = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4,}$/;
        if (!birthDatePattern.test(birthDate)) {
            errors.push('Invalid birth date. Pattern is xx/xx/xxxx');
        }

        return errors;
    }
};