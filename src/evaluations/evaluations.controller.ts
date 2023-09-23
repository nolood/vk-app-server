import { Controller, Post } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Post('create')
  create() {
    return this.evaluationsService.createEvaluation();
  }
}
