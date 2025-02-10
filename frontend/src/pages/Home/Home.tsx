import { ChangeEvent, useEffect, useState } from 'react';

import './Home.css';
import LastArticlePreview from '../../components/LastArticlePreview/LastArticlePreview';
import { Button, ButtonProps, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as colors from '@mui/material/colors';
import ArticlePreview from '../../components/ArticlePreview/ArticlePreview';
import axios from 'axios';

type Category = {
    id: number;
    name: string;
    color?: string;
};

type Article = {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    category: string;
    author: {
        id: number;
        email: string;
        login: string;
        birthDate: string;
        image: string;
        role: string;
    }
};

type ServerResponse<T> = {
    data: T[];
    total: number;
};


function Home() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>({
        id: 0,
        name: 'all'
    });
    
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [paginationTotalCount, setPaginationTotalCount] = useState<number>(1);
    
    const [lastArticles, setLastArticles] = useState<Article[]>([]);
    
    useEffect(() => {
        axios.get<Category[]>(`http://localhost:8000/categories`)
                .then(response => {
                    setCategories([{ id: 0, name: 'all' }, ...response.data]);
                    setSelectedCategory({ id: 0, name: 'all' });
                });
    }, []);

    useEffect(() => {
        const defaultUrl: string = `http://localhost:8000/articles`; 
        const requestedUrl: string = selectedCategory.id === 0 ? 
            defaultUrl + `?page=${selectedPage}` : 
            defaultUrl + `?category=${selectedCategory.id}&page=${selectedPage}`; 
        axios.get<ServerResponse<Article>>(requestedUrl)
                .then(response => {
                    const { data, total } = response.data;
                    setArticles(data);
                    setPaginationTotalCount(Math.ceil(total / 10));
                });
    }, [selectedCategory, selectedPage]);
    
    const muiColors: any[] = Object.values(colors);

    let i = 0;
    for (let category of categories) {
        category.color = muiColors[i++][800];
        if (i === muiColors.length) i = 0;
    };

    function handleCategoryBtnClick(category: Category): void {
        setSelectedCategory(category);
        setSelectedPage(1);
    };

    function handlePaginationBtnClick(_: ChangeEvent<unknown>, value: number): void {
        setSelectedPage(value);
    }

    return (
        <div className="home__block">
            <div className='home__block-left_sidebar'>
                <div className='left_sidebar-categories'>
                    <span className='left_sidebar-categories-title'>Categories</span>
                    <ul className='left_sidebar-categories-list'>
                        {
                            categories.map((category,idx) => {
                                const ColorButton = styled(Button)<ButtonProps>(() => ({
                                    borderColor: selectedCategory.id === category.id ?
                                        colors.blue[800] :
                                        category.color,
                                    color: selectedCategory.id === category.id ?
                                        'white' :
                                        category.color,
                                    backgroundColor: selectedCategory.id === category.id ?
                                        colors.blue[800] :
                                        ''
                                }));
                                return (
                                    <li className='left_sidebar-categories-item' key={idx}
                                        onClick={() => handleCategoryBtnClick(category)}
                                    >
                                        <ColorButton variant='outlined'>{category.name}</ColorButton>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='home__block-main'>
                <div className='main-articles'>
                        {
                            articles.map((article,idx) => <ArticlePreview {...article} key={idx}/>)
                        }
                </div>
                <div className='main-articles-pagination'>
                        <Pagination 
                            count={paginationTotalCount} 
                            onChange={handlePaginationBtnClick}
                            color='primary'
                            page={selectedPage}
                        />
                </div>
            </div>
            <div className='home__block-right_sidebar'>
                <div className='right_sidebar-last_articles'>
                    <span className='right_sidebar-last_articles-title'>Last articles</span>
                    {
                        lastArticles.map((article,idx) => <LastArticlePreview {...article} key={idx}/> )
                    }
                </div>
            </div>
        </div>
    )
};

export default Home;