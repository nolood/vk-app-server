import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/users/users.model";
import { EvaluationsController } from "./evaluations.controller";
import { Evaluation } from "./evaluations.model";
import { EvaluationsService } from "./evaluations.service";
import { Category } from "../categories/categories.model";
import { EvaluationCategory } from "../categories/evaluations-categories.model";

@Module({
  controllers: [EvaluationsController],
  providers: [EvaluationsService],
  imports: [
    SequelizeModule.forFeature([
      Evaluation,
      User,
      Category,
      EvaluationCategory,
    ]),
  ],
})
export class EvaluationsModule {}
