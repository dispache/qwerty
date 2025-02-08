import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleEntity } from './article.entity';


@Controller('articles')
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    public getAllArticles(): Promise<ArticleEntity[]> {
        return this.articlesService.getAllArticles();
    }
}
