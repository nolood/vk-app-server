import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common'
import { UserIdGuard } from '../users/auth.guard'
import { User } from '../users/users.model'
import { CriteriaService } from './criteria.service'
import { EvaluateCriterionDto } from './dto/evaluate-criterion.dto'

@Controller('criteria')
export class CriteriaController {
	constructor(private readonly criteriaService: CriteriaService) {}

	@UseGuards(UserIdGuard)
	@Post('/')
	evaluate(@Body() dto: EvaluateCriterionDto, @Req() req: { user: User }) {
		return this.criteriaService.evaluate(dto, req.user.id)
	}

	@UseGuards(UserIdGuard)
	@Get('/check/:criterionId')
	check(@Req() req: { user: User }, @Param() data: { criterionId: bigint }) {
		return this.criteriaService.checkAvailability(data.criterionId, req.user.id)
	}
}
