import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserIdGuard } from 'src/users/auth.guard'
import { User } from 'src/users/users.model'
import { CreateEvaluationDto } from './dto/create-evaluation.dto'
import { EvaluationCodeDto } from './dto/evaluation-code.dto'
import { GetAllEvaluationsBodyDto } from './dto/get-all-evaluations-body.dto'
import { GetAllEvaluationsQueryDto } from './dto/get-all-evaluations-query.dto'
import { EvaluationsService } from './evaluations.service'

@Controller('evaluations')
export class EvaluationsController {
	constructor(private readonly evaluationsService: EvaluationsService) {}

	@UseGuards(UserIdGuard)
	@Post('create')
	@UseInterceptors(FileInterceptor('image'))
	create(
		@Body() dto: CreateEvaluationDto,
		@Req() req: { user: User },
		@UploadedFile() image?: any
	) {
		return this.evaluationsService.createEvaluation(dto, req.user.id, image)
	}

	// @UseGuards(UserIdGuard)
	@Post('/all')
	getAllAvailableEvaluations(
		@Query() query: GetAllEvaluationsQueryDto,
		@Body() body: GetAllEvaluationsBodyDto
	) {
		return this.evaluationsService.getAllAvailableEvaluations(body, query)
	}

	// @UseGuards(UserIdGuard)
	@Get('/:code')
	getByCode(@Param() dto: EvaluationCodeDto) {
		return this.evaluationsService.getByCode(dto)
	}

	// @UseGuards(UserIdGuard)
	@Get('/')
	getAll() {
		return this.evaluationsService.getAllEvaluations()
	}
}
