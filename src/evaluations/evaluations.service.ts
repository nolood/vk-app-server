import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Criterion } from "src/criteria/criteria.model";
import { FilesService } from "src/files/files.service";
import { CodesService } from "../codes/codes.service";
import { CreateEvaluationDto } from "./dto/create-evaluation.dto";
import { Evaluation } from "./evaluations.model";
import { CategoriesService } from "../categories/categories.service";
import { GetAllEvaluationsQueryDto } from "./dto/get-all-evaluations-query.dto";
import { GetAllEvaluationsBodyDto } from "./dto/get-all-evaluations-body.dto";
import { Category } from "../categories/categories.model";
import { Op } from "sequelize";

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectModel(Evaluation) private evaluationRepository: typeof Evaluation,
    @InjectModel(Criterion) private criterionRepository: typeof Criterion,
    private fileService: FilesService,
    private codesService: CodesService,
    private categoriesService: CategoriesService,
  ) {}
  async createEvaluation(dto: CreateEvaluationDto, userId: number, image: any) {
    const isPrivate: boolean = JSON.parse(dto.private);
    const categories: string[] = JSON.parse(dto.categories);
    const criteria: string[] = JSON.parse(dto.criteria);

    const fileName = await this.fileService.createFile(image);
    const code = await this.codesService.generateUniqueCode();
    const evaluation = {
      title: dto.title,
      description: dto.description,
      image: fileName,
      private: isPrivate,
      ownerId: userId,
      codeId: code.id,
    };
    const newEvaluation = await this.evaluationRepository.create(evaluation);

    if (Array.isArray(categories)) {
      for (const category of categories) {
        const categoryInstance = await this.categoriesService.getById(category);
        await newEvaluation.$add("categories", categoryInstance);
      }
    }

    if (Array.isArray(criteria)) {
      for (const criterion of criteria) {
        await this.criterionRepository.create({
          title: criterion,
          evaluationId: newEvaluation.id,
        });
      }
    }
    return await this.evaluationRepository.findOne({
      where: { id: newEvaluation.id },
      include: ["code"],
    });
  }

  async getAllAvailableEvaluations(
    body: GetAllEvaluationsBodyDto,
    query: GetAllEvaluationsQueryDto,
  ) {
    const { page, limit } = query;
    const offset = (page - 1) * limit;
    const evaluations = await this.evaluationRepository.findAll({
      where: {
        private: false,
        status: "active",
      },
      include: [
        {
          model: Category,
          through: {
            attributes: [],
          },
        },
      ],
      offset,
      limit,
    });

    if (body.categories?.length) {
      return evaluations.filter((evaluation) =>
        evaluation.categories.find((category) =>
          body.categories.includes(category.id),
        ),
      );
    }
    return evaluations;
  }

  async getAllEvaluations() {
    return await this.evaluationRepository.findAll({
      include: ["criteria", "owner"],
    });
  }
}
