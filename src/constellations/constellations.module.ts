import { Module } from "@nestjs/common";
import { ConstellationsController } from "./constellations.controller";
import { ConstellationsService } from "./constellations.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Constellation } from "./constellations.model";
import { UsersConstellations } from "./users-constellation.model";

@Module({
  controllers: [ConstellationsController],
  providers: [ConstellationsService],
  imports: [
    SequelizeModule.forFeature([Constellation, User, UsersConstellations]),
  ],
})
export class ConstellationsModule {}
