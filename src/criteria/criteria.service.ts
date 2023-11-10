import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Evaluation } from 'src/evaluations/evaluations.model'
import { Comment } from '../comments/comments.model'
import { Criterion } from './criteria.model'
import { EvaluateCriterionDto } from './dto/evaluate-criterion.dto'

@Injectable()
export class CriteriaService {
	constructor(
		@InjectModel(Criterion) private criterionRepository: typeof Criterion,
		@InjectModel(Comment) private commentRepository: typeof Comment,
		@InjectModel(Evaluation) private evaluationRepository: typeof Evaluation
	) {}

	async evaluate(dto: EvaluateCriterionDto, id: number) {
		const criterion = await this.criterionRepository.findOne({
			where: { id: dto.criterionId },
			include: ['comments'],
		})

		if (!criterion) {
			throw new HttpException('Criterion not found', HttpStatus.BAD_REQUEST)
		}

		const comment = await this.commentRepository.create({
			score: dto.score,
			title: dto.comment,
			criterionId: dto.criterionId,
			userId: id,
		})

		await criterion.$add('comments', comment)

		const sum = criterion.comments.reduce(
			(acc, comment) => acc + comment.score,
			0
		)

		// Средняя арифметическая оценка у критерия

		await criterion.update({
			score: isNaN(Math.ceil(sum / criterion.comments.length))
				? dto.score
				: Math.ceil(sum / criterion.comments.length),
		})

		const evaluation = await this.evaluationRepository.findOne({
			include: {
				model: Criterion,
				where: {
					id: criterion.id,
				},
			},
		})

		if (!evaluation) {
			throw new HttpException('Evaluation not found', HttpStatus.BAD_REQUEST)
		}

		const updatedScoreCount = evaluation.scoreCount + 1

		// Счётчик на кол-во оцениваний (не уникальных человек, а по каждому критерию, то есть 1 человек оценит все критерии и здесь запишется по каждому критерию)

		await evaluation.update({ scoreCount: updatedScoreCount })

		return criterion
	}

	async checkAvailability(criterionId: bigint, userId: number) {
		const criterion = await this.criterionRepository.findOne({
			where: { id: criterionId },
			include: [
				{
					model: Comment,
					where: {
						userId,
					},
				},
			],
		})
		return criterion
	}

	async getCriteriaByEvaluation(evaluationId: string) {
		return await this.criterionRepository.findAll({
			where: {
				evaluationId,
			},
		})
	}
}
