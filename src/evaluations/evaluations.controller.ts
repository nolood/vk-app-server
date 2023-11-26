import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
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
	@Post('all')
	getAllAvailableEvaluations(
		@Query() query: GetAllEvaluationsQueryDto,
		@Body() body: GetAllEvaluationsBodyDto
	) {
		return this.evaluationsService.getAllAvailableEvaluations(body, query)
	}

	@UseGuards(UserIdGuard)
	@Get('/:code')
	getByCode(@Param() dto: EvaluationCodeDto, @Req() req: { user: User }) {
		return this.evaluationsService.getByCode(dto, req.user.id)
	}

	@UseGuards(UserIdGuard)
	@Post('my')
	getYourEvaluations(
		@Req() req: { user: User },
		@Query() query: GetAllEvaluationsQueryDto
	) {
		return this.evaluationsService.getMyEvaluations(query, req.user.id)
	}

	//  @UseGuards(UserIdGuard)
	@Get('/')
	getAll() {
		return this.evaluationsService.getAllEvaluations()
	}

	@UseGuards(UserIdGuard)
	@Post('/finish/:id')
	finishEvaluation(@Param() dto: { id: string }, @Req() req: { user: User }) {
		return this.evaluationsService.finishEvaluation(dto.id, req.user.id)
	}

	@UseGuards(UserIdGuard)
	@Post('passed')
	getPassedEvaluations(
		@Req() req: { user: User },
		@Query() query: GetAllEvaluationsQueryDto
	) {
		return this.evaluationsService.getPassedEvaluations(req.user.id, query)
	}

  @UseGuards(UserIdGuard)
  @Put("finish-evaluate/:evaluationId")
  finishEvaluate(
    @Req() req: { user: User },
    @Param() dto: { evaluationId: string },
  ) {
    return this.evaluationsService.finishEvaluate(dto.evaluationId, req.user.id) 
  }
}
