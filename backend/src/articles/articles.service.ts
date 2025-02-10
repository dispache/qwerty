import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticlesService {

    constructor(private readonly articlesRepository: ArticlesRepository) {}

    public getAllArticles(): Promise<ArticleEntity[]> {
        return this.articlesRepository.getAllArticles();
    }

    public getArticlesByCategoryAndPage(categoryId: number, page: number): Promise<ArticleEntity[]> {
        const offset = (page-1) * 10;
        return categoryId ?
            this.articlesRepository.getArticlesByCategoryAndPage(categoryId, offset) :
            this.articlesRepository.getAllArticlesByPage(offset);
    }

    public getArticlesAmount(categoryId: number): Promise<number> {
        return categoryId ? 
            this.articlesRepository.getArticlesAmountByCategory(categoryId) :
            this.articlesRepository.getArticlesAmount();
    }

}
