import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { EvaluationsController } from './evaluations.controller';
import { Evaluation } from './evaluations.model';
import { EvaluationsService } from './evaluations.service';
import { UsersEvaluations } from './users-evaluations.model';

@Module({
  controllers: [EvaluationsController],
  providers: [EvaluationsService],
  imports: [SequelizeModule.forFeature([Evaluation, User, UsersEvaluations])],
})
export class EvaluationsModule {}
