import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleEntity } from './article.entity';

type ServerResponse<T> = {
    data: T[],
    total: number;
};

@Controller('articles')
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    public async getAllArticles(
        @Query('category') categoryId: number,
        @Query('page') page: number
    ): Promise<ServerResponse<ArticleEntity>> { 
        return {
            data: await this.articlesService.getArticlesByCategoryAndPage(categoryId, page),
            total: await this.articlesService.getArticlesAmount(categoryId)
        };
    }
}
