import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { Article } from './articles.controller';

@Injectable()
export class ArticlesService {

    constructor(private readonly articlesRepository: ArticlesRepository) {}

    public getAllArticles(): Promise<Article[]> {
        return this.articlesRepository.getAllArticles();
    }

}
