import { Module } from "@nestjs/common";
import { PlacementsService } from "./placements.service";
import { PlacementsController } from "./placements.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Placement } from "./placements.model";
import { Accessory } from "../accessories/accessories.model";

@Module({
  providers: [PlacementsService],
  controllers: [PlacementsController],
  imports: [SequelizeModule.forFeature([Placement, Accessory])],
})
export class PlacementsModule {}
