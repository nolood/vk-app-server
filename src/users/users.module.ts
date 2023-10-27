import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Evaluation } from "src/evaluations/evaluations.model";
import { UsersController } from "./users.controller";
import { User } from "./users.model";
import { UsersService } from "./users.service";
import { Mascot } from "../mascot/mascot.model";
import { Constellation } from "../constellations/constellations.model";
import { UsersConstellations } from "../constellations/users-constellation.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Evaluation,
      Mascot,
      Constellation,
      UsersConstellations,
    ]),
  ],
})
export class UsersModule {}
