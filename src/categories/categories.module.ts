import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "./categories.model";
import { EvaluationCategory } from "./evaluations-categories.model";
import { Evaluation } from "../evaluations/evaluations.model";

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([Category, EvaluationCategory, Evaluation]),
  ],
})
export class CategoriesModule {}
