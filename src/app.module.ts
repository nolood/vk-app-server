import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { Evaluation } from './evaluations/evaluations.model';
import { UsersEvaluations } from './evaluations/users-evaluations.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Evaluation, UsersEvaluations],
      autoLoadModels: true,
    }),
    UsersModule,
    EvaluationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
