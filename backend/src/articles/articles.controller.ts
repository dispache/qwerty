import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './articles.service';

export type Article = {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    category: string;
};

@Controller('articles')
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    public getAllArticles(): Promise<Article[]> {
        return this.articlesService.getAllArticles();
    }
}
