import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Criterion } from 'src/criteria/criteria.model'
import { Mascot } from 'src/mascot/mascot.model'
import { User } from 'src/users/users.model'
import { UsersService } from 'src/users/users.service'
import { Category } from '../categories/categories.model'
import { EvaluationCategory } from '../categories/evaluations-categories.model'
import { EvaluationsController } from './evaluations.controller'
import { Evaluation } from './evaluations.model'
import { EvaluationsService } from './evaluations.service'
import { FilesModule } from 'src/files/files.module'

@Module({
	controllers: [EvaluationsController],
	providers: [EvaluationsService, UsersService],
	imports: [
		SequelizeModule.forFeature([
			Evaluation,
			User,
			Category,
			EvaluationCategory,
			Criterion,
			Mascot,
		]),
		FilesModule,
	],
})
export class EvaluationsModule {}
