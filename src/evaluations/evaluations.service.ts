import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Criterion } from 'src/criteria/criteria.model'
import { FilesService } from 'src/files/files.service'
import { CreateEvaluationDto } from './dto/create-evaluation.dto'
import { Evaluation } from './evaluations.model'

@Injectable()
export class EvaluationsService {
	constructor(
		@InjectModel(Evaluation) private evaluationRepository: typeof Evaluation,
		@InjectModel(Criterion) private criterionRepository: typeof Criterion,
		private fileService: FilesService
	) {}
	async createEvaluation(dto: CreateEvaluationDto, userId: number, image) {
		const fileName = await this.fileService.createFile(image)
		const evaluation = {
			title: dto.title,
			description: dto.description,
			image: fileName,
			private: dto.private,
			ownerId: userId,
		}
		const newEvaluation = await this.evaluationRepository.create(evaluation)

		if (Array.isArray(dto.criteria)) {
			for (const criterion of dto.criteria) {
				await this.criterionRepository.create({
					title: criterion,
					evaluationId: newEvaluation.id,
				})
			}
		}

		return newEvaluation
	}

	async getAllEvaluations() {
		return await this.evaluationRepository.findAll({
			include: ['criteria', 'owner'],
		})
	}
}
