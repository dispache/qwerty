import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

export type Category = {
    id: string;
    name: string;
};

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    public getAllCategories(): Promise<Category[]> {
        return this.categoriesService.getAllCategories();
    }
}
