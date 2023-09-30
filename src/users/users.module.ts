import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Evaluation } from 'src/evaluations/evaluations.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UsersEvaluations } from '../evaluations/users-evaluations.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Evaluation, UsersEvaluations])],
})
export class UsersModule {}
