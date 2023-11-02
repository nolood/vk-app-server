import { Module } from "@nestjs/common";
import { CriteriaController } from "./criteria.controller";
import { CriteriaService } from "./criteria.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Criterion } from "./criteria.model";
import { Comment } from "../comments/comments.model";
import { User } from "../users/users.model";
import { UsersService } from "../users/users.service";
import { Mascot } from "../mascot/mascot.model";

@Module({
  controllers: [CriteriaController],
  providers: [CriteriaService, UsersService],
  imports: [SequelizeModule.forFeature([Comment, Criterion, User, Mascot])],
})
export class CriteriaModule {}
