import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EvaluationsController } from './evaluations.controller';
import { Evaluation } from './evaluations.model';
import { EvaluationsService } from './evaluations.service';

@Module({
  controllers: [EvaluationsController],
  providers: [EvaluationsService],
  imports: [SequelizeModule.forFeature([Evaluation])],
})
export class EvaluationsModule {}
