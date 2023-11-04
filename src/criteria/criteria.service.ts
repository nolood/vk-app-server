import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Comment } from '../comments/comments.model'
import { Criterion } from './criteria.model'
import { EvaluateCriterionDto } from './dto/evaluate-criterion.dto'

@Injectable()
export class CriteriaService {
	constructor(
		@InjectModel(Criterion) private criterionRepository: typeof Criterion,
		@InjectModel(Comment) private commentRepository: typeof Comment
	) {}

	async evaluate(dto: EvaluateCriterionDto, id: number) {
		const criterion = await this.criterionRepository.findOne({
			where: { id: dto.criterionId },
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
		return criterion;
	}
}
