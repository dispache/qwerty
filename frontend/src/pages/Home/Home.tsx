import { useState } from 'react';

import './Home.css';
import ArticlePreview from '../../components/ArticlePreview/ArticlePreview';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as colors from '@mui/material/colors';

function Home() {

    const [lastArticles, setLastArticles] = useState([
        {
            title: "Last article's title and here we are hello world so",
            author: {
                image: 'image',
                login: 'user_login'
            },
            category: 'Sport',
            createdAt: '2025-02-03'
        },
        {
            title: "Last article's title",
            author: {
                image: 'image',
                login: 'user_login'
            },
            category: 'Fashion',
            createdAt: '2025-02-03'
        },
        {
            title: "Last article's title",
            author: {
                image: 'image',
                login: 'user_login'
            },
            category: 'Technologies',
            createdAt: '2025-02-03'
        }
    ]); 
    const [categories, setCategories] = useState<{name: string, color?: string}[]>([
        {
            name: 'All categories'
        },
        {
            name: 'Sport'
        },
        {
            name: 'Fashion'
        },
        {
            name: 'Technologies'
        },
        {
            name: 'Technologies'
        },
        {
            name: 'Technologies'
        },
        {
            name: 'Technologies'
        },
        {
            name: 'Technologies'
        },
        {
            name: 'Technologies'
        },
        {
            name: 'Technologies'
        }
    ]);

    const muiColors: any[] = Object.values(colors);


    let i = 0;
    for (let category of categories) {
        category.color = muiColors[i++][800];
        if (i === muiColors.length) i = 0;
    };

    return (
        <div className="home__block">
            <div className='home__block-left_sidebar'>
                <div className='left_sidebar-categories'>
                    <span className='left_sidebar-categories-title'>Categories</span>
                    <ul className='left_sidebar-categories-list'>
                        {
                            categories.map((category,idx) => {
                                const ColorButton = styled(Button)<ButtonProps>(() => ({
                                    borderColor: category.color,
                                    color: category.color
                                }));
                                return (
                                    <li className='left_sidebar-categories-item' key={idx}>
                                        <ColorButton variant='outlined'>{category.name}</ColorButton>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='home__block-main'>Home page content</div>
            <div className='home__block-right_sidebar'>
                <div className='right_sidebar-last_articles'>
                    <span className='right_sidebar-last_articles-title'>Last articles</span>
                    {
                        lastArticles.map((article,idx) => <ArticlePreview {...article} key={idx}/> )
                    }
                </div>
            </div>
        </div>
    )
};

export default Home;