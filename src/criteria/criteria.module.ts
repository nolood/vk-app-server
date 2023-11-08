import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Evaluation } from 'src/evaluations/evaluations.model'
import { Comment } from '../comments/comments.model'
import { Mascot } from '../mascot/mascot.model'
import { User } from '../users/users.model'
import { UsersService } from '../users/users.service'
import { CriteriaController } from './criteria.controller'
import { Criterion } from './criteria.model'
import { CriteriaService } from './criteria.service'

@Module({
	controllers: [CriteriaController],
	providers: [CriteriaService, UsersService],
	imports: [
		SequelizeModule.forFeature([Comment, Criterion, User, Mascot, Evaluation]),
	],
})
export class CriteriaModule {}
