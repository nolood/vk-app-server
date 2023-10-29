import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./categories.model";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    return this.categoryRepository.create(dto);
  }

  async getAllCategories() {
    return await this.categoryRepository.findAll();
  }
}
