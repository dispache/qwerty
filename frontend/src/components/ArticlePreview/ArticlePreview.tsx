import './ArticlePreview.css';

import { Avatar } from '@mui/material';

type ArticlePreviewProps = {
    title: string;
    author: {
        login: string;
        image: string;
    },
    category: string;
    createdAt: string;
};

function ArticlePreview({ title, category, createdAt }: ArticlePreviewProps) {
    return (
        <div className="article-preview__block">
            <div className="article-preview_author">
                <div>
                    <Avatar 
                        alt="Remy Sharp" 
                    />
                </div>
            </div>
            <div className="article-preview_main">
                <div className="article-preview_main-title">{title.length > 40 ? title + '...' : title}</div>
            </div>
            <div className="article-preview_info">
                <div className="article-preview_info-category">{category}</div>
                <div className='article-preview_info-created_at'>{createdAt}</div>
            </div>
        </div>
    );
};

export default ArticlePreview;