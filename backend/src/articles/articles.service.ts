import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticlesService {

    constructor(private readonly articlesRepository: ArticlesRepository) {}

    public getAllArticles(): Promise<ArticleEntity[]> {
        return this.articlesRepository.getAllArticles();
    }

}
