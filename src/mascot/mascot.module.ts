import { Module } from "@nestjs/common";
import { MascotService } from "./mascot.service";
import { MascotController } from "./mascot.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Mascot } from "./mascot.model";
import { MascotAccessory } from "./mascot-accessories.model";

@Module({
  providers: [MascotService],
  controllers: [MascotController],
  imports: [SequelizeModule.forFeature([Mascot, MascotAccessory])],
})
export class MascotModule {}
