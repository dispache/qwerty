import { useState } from 'react';

import './Header.css';

import { Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle, Logout, Settings } from '@mui/icons-material'

function Header() {

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
                    true ?   
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
                    : <div>sign in</div>
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