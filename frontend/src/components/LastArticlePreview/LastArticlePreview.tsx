import './LastArticlePreview.css';

import { Avatar } from '@mui/material';

type LastArticlePreviewProps = {
    title: string;
    author: {
        login: string;
        image: string;
    },
    category: string;
    createdAt: string;
};

function LastArticlePreview({ title, category, createdAt }: LastArticlePreviewProps) {
    return (
        <div className="last_article-preview__block">
            <div className="last_article-preview_author">
                <div>
                    <Avatar 
                        alt="Remy Sharp" 
                    />
                </div>
            </div>
            <div className="last_article-preview_main">
                <div className="last_article-preview_main-title">{title.length > 40 ? title + '...' : title}</div>
            </div>
            <div className="last_article-preview_info">
                <div className="last_article-preview_info-category">{category}</div>
                <div className='last_article-preview_info-created_at'>{createdAt}</div>
            </div>
        </div>
    );
};

export default LastArticlePreview;