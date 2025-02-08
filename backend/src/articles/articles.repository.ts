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

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    public async getAllArticles(): Promise<ArticleEntity[]> {
        const result: ArticleQueryResult[] = await this.dataSource.query(
            `SELECT a.id, a.title, a.text, a.created_at as created_at, c.name as category,
             u.id as author_id, u.email as author_email, u.login as author_login, u.birth_date as author_birth_date,
             u.image as author_image, (select r.name from roles r join users u on u.role = r.id) as author_role 
             from articles a
             JOIN CATEGORIES c on a.category_id = c.id
             JOIN USERS u on a.author_id = u.id
             JOIN ROLES r on u.role = r.id
            `
        );
        return result.map(value => new ArticleEntity(value));
    }
}