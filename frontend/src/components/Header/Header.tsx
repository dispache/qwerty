import { useState } from 'react';

import './Header.css';

import { Avatar, Button, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle, Login, Logout, PersonAdd, Settings } from '@mui/icons-material'

function Header() {

    const [authUser, setAuthUser] = useState<any>(null);

    const [showUserMenu, setShowUserMenu] = useState<boolean>(false); 

    function handleMouseOverAuth() {
        setShowUserMenu(true);
    };

    function handleMouseOutAuth() {
        setShowUserMenu(false);
    };

    return (
        <div className='header__block'>
            <div className='header__logo'>
                <span className='header__logo-title' onClick={() => window.location.href = '/'}>Qwerty</span>
            </div>
            <div className='header__auth'>
                {
                    authUser ?   
                        <div className='header__auth-user' 
                            onMouseOver={handleMouseOverAuth} 
                            onMouseOut={handleMouseOutAuth}
                        >
                            <Avatar 
                                alt="Remy Sharp" src="/static/images/avatar/1.jpg" 
                                className='header__auth-user_image'
                            />
                            <span className='header__auth-user_login'>user_login</span>
                        </div>
                    : 
                        <div className='header__auth-btns'>
                            <Button 
                                variant='contained' 
                                startIcon={<Login/>}
                                onClick={() => { window.location.href = '/auth/sign-in'}}
                            >Sign In</Button>
                            <Button 
                                variant='contained' 
                                color='error'
                                startIcon={<PersonAdd/>}
                                onClick={() => window.location.href = '/auth/sign-up'}
                            >Sign Up</Button>
                        </div>
                }
                {    showUserMenu ?
                        <div className='header__auth-user-menu' 
                            onMouseOver={handleMouseOverAuth}
                            onMouseOut={handleMouseOutAuth}
                        >
                            <ListItem>
                                <span className='header__auth-user-menu_item'>
                                <ListItemIcon><AccountCircle /></ListItemIcon>           
                                    <ListItemText>My profile</ListItemText>
                                </span>
                            </ListItem>
                            <ListItem>
                                <span className='header__auth-user-menu_item'>
                                <ListItemIcon><Settings /></ListItemIcon>
                                    <ListItemText>My settings</ListItemText>
                                </span>
                            </ListItem>
                            <ListItem>
                                <span className='header__auth-user-menu_item'>
                                <ListItemIcon><Logout /></ListItemIcon>
                                    <ListItemText>Sign out</ListItemText>
                                </span>
                            </ListItem>
                        </div>
                    : ''
                }
            </div>
        </div>
    );
};

export default Header;