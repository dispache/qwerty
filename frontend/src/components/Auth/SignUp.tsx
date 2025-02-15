import './SignUp.css';

import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import 'dayjs/locale/en-gb';

type SignUpDto = {
    email: string;
    login: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    birthDate?: string | null;
};

function SignUp() {

    function handleSignUpFormSubmit(event: any) {
        event.preventDefault();

        const signUpForm = document.forms[0] as HTMLFormElement;
        const email: string = signUpForm['email'].value;
        const login: string = signUpForm['login'].value;
        const password: string = signUpForm['password'].value;
        const firstName: string = signUpForm['firstName'].value;
        const lastName: string = signUpForm['lastName'].value;
        const birthDate: any = signUpForm['birthDate'].value;
        
        const data: SignUpDto = {
            email, login, password, 
            firstName: firstName || null, 
            lastName: lastName || null, 
            birthDate: birthDate || null
        };

        axios.post('http://localhost:8000/auth/sign-up', data)
            .then((response) => {
                console.log(response.data);
            })
            .catch(error => console.log(error));

    }

    return (
        <div className="sign-up__block">
            <form className='sign-up_form' name='sign-up'>
                <span className='sign-up_form-title'>Welcome in!</span>
                <ul className='sign-up_form-list'>
                    <li>
                        <TextField type='email' label='Email' size='small' required fullWidth name='email'/>
                    </li>
                    <li>
                        <TextField label='Login' size='small' required fullWidth name='login'/>
                    </li>
                    <li>
                        <TextField type='password' label='Password' size='small' required fullWidth name='password'/>
                    </li>
                    <li className='sign-up_form-item-names'>
                        <TextField label='First name' size='small' fullWidth name='firstName'/>
                        <TextField label='Last name' size='small' fullWidth name='lastName'/>
                    </li>
                    <li className='sign-up_form-item-birth-date'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                            <DatePicker name='birthDate'/>
                        </LocalizationProvider>
                    </li>
                </ul>
                <div className='sign-up_form-btns'>
                    <Button 
                        variant='contained' 
                        type='submit'
                        onClick={handleSignUpFormSubmit}
                    >Create</Button>
                    <Button variant='outlined' color='error'>Reset</Button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;