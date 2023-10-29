import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Controller("categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post("/")
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @Get("/")
  getAll() {
    return this.categoriesService.getAllCategories();
  }
}
