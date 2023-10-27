import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { Accessory } from './accessories/accessories.model'
import { AccessoriesModule } from './accessories/accessories.module'
import { Category } from './categories/categories.model'
import { CategoriesModule } from './categories/categories.module'
import { EvaluationCategory } from './categories/evaluations-categories.model'
import { Code } from './codes/codes.model'
import { CodesModule } from './codes/codes.module'
import { Comment } from './comments/comments.model'
import { CommentsModule } from './comments/comments.module'
import { Constellation } from './constellations/constellations.model'
import { ConstellationsModule } from './constellations/constellations.module'
import { UsersConstellations } from './constellations/users-constellation.model'
import { Criterion } from './criteria/criteria.model'
import { CriteriaModule } from './criteria/criteria.module'
import { Evaluation } from './evaluations/evaluations.model'
import { EvaluationsModule } from './evaluations/evaluations.module'
import { FilesModule } from './files/files.module'
import { MascotAccessory } from './mascot/mascot-accessories.model'
import { Mascot } from './mascot/mascot.model'
import { MascotModule } from './mascot/mascot.module'
import { Placement } from './placements/placements.model'
import { PlacementsModule } from './placements/placements.module'
import { User } from './users/users.model'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [
				User,
				Evaluation,
				Mascot,
				Accessory,
				Placement,
				MascotAccessory,
				Category,
				EvaluationCategory,
				UsersConstellations,
				Constellation,
				Criterion,
				Comment,
				Code,
			],
			autoLoadModels: true,
		}),
		UsersModule,
		EvaluationsModule,
		MascotModule,
		AccessoriesModule,
		PlacementsModule,
		CategoriesModule,
		ConstellationsModule,
		CriteriaModule,
		CommentsModule,
		CodesModule,
		FilesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
