import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { ArticleEntity } from "./article.entity";

type ArticleQueryResult = {
    id: number;
    title: string;
    text: string;
    created_at: string;
    category: string;
    author_id: number;
    author_email: string;
    author_login: string;
    author_birth_date: string;
    author_image: string;
    author_role: string;
};


@Injectable()
export class ArticlesRepository {

    private readonly defaultArticlesQuery: string = `
             SELECT a.id, a.title, a.text, a.created_at as created_at, c.name as category,
             u.id as author_id, u.email as author_email, u.login as author_login, u.birth_date as author_birth_date,
             u.image as author_image, (select r.name from roles r join users u on u.role = r.id) as author_role 
             from articles a
             JOIN CATEGORIES c on a.category_id = c.id
             JOIN USERS u on a.author_id = u.id
             JOIN ROLES r on u.role = r.id `; 
    private readonly defaultArticlesAmountQuery: string = `SELECT COUNT(*) FROM ARTICLES `;

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    public async getAllArticles(): Promise<ArticleEntity[]> {
        const result: ArticleQueryResult[] = await this.dataSource.query(
            this.defaultArticlesQuery
        );
        return result.map(value => new ArticleEntity(value));
    }

    public async getArticlesByCategoryAndPage(categoryId: number, offset: number): Promise<ArticleEntity[]> {
        const result: ArticleQueryResult[] = await this.dataSource.query(
            this.defaultArticlesQuery + `WHERE c.id=${categoryId} LIMIT 10 OFFSET ${offset}`
        );
        return result.map(value => new ArticleEntity(value));
    }

    public async getArticlesAmount(): Promise<number> {
        const result: number = (await this.dataSource.query(this.defaultArticlesAmountQuery))[0]['count']; 
        return result;
    }

    public async getArticlesAmountByCategory(categoryId: number): Promise<number> {
        const result: number = (await this.dataSource.query(
            this.defaultArticlesAmountQuery + `WHERE articles.category_id=${categoryId}`
        ))[0]['count'];
        return result; 
    }

    public async getAllArticlesByPage(offset: number): Promise<ArticleEntity[]> {
        const result: ArticleQueryResult[] = await this.dataSource.query(
            this.defaultArticlesQuery + `LIMIT 10 OFFSET ${offset}`
        );
        return result.map(value => new ArticleEntity(value));
    }
}