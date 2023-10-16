import { Module } from "@nestjs/common";
import { AccessoriesService } from "./accessories.service";
import { AccessoriesController } from "./accessories.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Accessory } from "./accessories.model";
import { Placement } from "../placements/placements.model";
import { MascotAccessory } from "../mascot/mascot-accessories.model";

@Module({
  providers: [AccessoriesService],
  controllers: [AccessoriesController],
  imports: [
    SequelizeModule.forFeature([Accessory, Placement, MascotAccessory]),
  ],
})
export class AccessoriesModule {}
