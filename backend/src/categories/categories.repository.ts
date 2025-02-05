import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Category } from "./categories.controller";

@Injectable()
export class CategoriesRepository {

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    public getAllCategories(): Promise<Category[]> {
        return this.dataSource.query('SELECT * FROM CATEGORIES');
    }
};