import { Module } from "@nestjs/common";
import { ConstellationsController } from "./constellations.controller";
import { ConstellationsService } from "./constellations.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Constellation } from "./constellations.model";
import { UsersConstellations } from "./users-constellation.model";
import { UsersService } from "../users/users.service";
import { Mascot } from "../mascot/mascot.model";

@Module({
  controllers: [ConstellationsController],
  providers: [ConstellationsService, UsersService],
  imports: [
    SequelizeModule.forFeature([
      Constellation,
      User,
      UsersConstellations,
      Mascot,
    ]),
  ],
})
export class ConstellationsModule {}
