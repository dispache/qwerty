import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from './categories.controller';

@Injectable()
export class CategoriesService {

    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    public getAllCategories(): Promise<Category[]> {
        return this.categoriesRepository.getAllCategories();
    }
}
