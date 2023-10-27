import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { UserIdGuard } from 'src/users/auth.guard'
import { User } from 'src/users/users.model'
import { CreateEvaluationDto } from './dto/create-evaluation.dto'
import { EvaluationsService } from './evaluations.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('evaluations')
export class EvaluationsController {
	constructor(private readonly evaluationsService: EvaluationsService) {}

	@UseGuards(UserIdGuard)
	@Post('create')
	@UseInterceptors(FileInterceptor('image'))
	create(
		@Body() dto: CreateEvaluationDto,
		@Req() req: { user: User },
		@UploadedFile() image
	) {
		return this.evaluationsService.createEvaluation(dto, req.user.id, image)
	}

	// @UseGuards(UserIdGuard)
	@Get('/')
	getAll() {
		return this.evaluationsService.getAllEvaluations()
	}
}
