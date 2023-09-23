import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Evaluation } from './evaluations.model';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectModel(Evaluation) private evaluationRepository: typeof Evaluation,
  ) {}
  async createEvaluation() {}
}
