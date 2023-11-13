import { Controller, Get, Param, Query } from '@nestjs/common'
import { CommentsService } from './comments.service'

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Get('/all')
	getAll() {
		return this.commentsService.getAll()
	}

	@Get('/:id')
	getByCriterionId(
		@Param() data: { id: bigint },
		@Query() query: { page: number; limit: number }
	) {
		return this.commentsService.getByCriterionId(data.id, query)
	}
}
