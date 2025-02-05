import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Article } from "./articles.controller";

@Injectable()
export class ArticlesRepository {

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    public getAllArticles(): Promise<Article[]> {
        return this.dataSource.query(
            `SELECT a.id, a.title, a.text, a.created_at as createdAt, c.name as category from articles a
             JOIN CATEGORIES c on a.category_id = c.id
            `
        );
    }
}