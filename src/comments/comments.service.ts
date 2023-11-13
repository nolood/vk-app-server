import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Comment } from './comments.model'

@Injectable()
export class CommentsService {
	constructor(
		@InjectModel(Comment) private commentRepository: typeof Comment
	) {}

	async getAll() {
		return this.commentRepository.findAll({ include: ['user'] })
	}

	async getByCriterionId(
		id: bigint,
		{ page, limit }: { page: number; limit: number }
	) {
		const offset = (page - 1) * limit
		return this.commentRepository.findAll({
			where: { criterionId: id },
			include: ['user'],
			offset,
			limit,
		})
	}
}
