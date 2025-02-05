import './ArticlePreview.css';

import { Avatar } from "@mui/material";

type ArticlePreviewProps = {
    title: string;
    author: {
        login: string;
        image: string;
    },
    category: string;
    createdAt: string;
};

function ArticlePreview({ title, author, category, createdAt } : ArticlePreviewProps) {
    return (
        <div className='main-articles_article'>
            <div className='main-articles_article-author'>
                <Avatar 
                    alt='Remy Sharp' 
                    className='main-articles_article-author_image'
                ></Avatar>
                <span className='main-articles_article-author_login'>
                    {author.login}
                </span>
            </div>
            <div className='main-articles_article-title'>
                {title}
            </div>
            <div className='main-articles_article-info'>
                <div className='main-articles_article-info_category'>{category}</div>
                <div>{createdAt}</div>
            </div>
        </div>
    );
};

export default ArticlePreview;