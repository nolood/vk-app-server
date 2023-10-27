import { Module } from "@nestjs/common";
import { CodesService } from "./codes.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Code } from "./codes.model";

@Module({
  providers: [CodesService],
  exports: [CodesService],
  imports: [SequelizeModule.forFeature([Code])],
})
export class CodesModule {}
