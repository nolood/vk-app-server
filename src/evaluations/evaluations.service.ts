import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Code } from 'src/codes/codes.model'
import { Comment } from 'src/comments/comments.model'
import { Criterion } from 'src/criteria/criteria.model'
import { FilesService } from 'src/files/files.service'
import { Category } from '../categories/categories.model'
import { CategoriesService } from '../categories/categories.service'
import { CodesService } from '../codes/codes.service'
import { CreateEvaluationDto } from './dto/create-evaluation.dto'
import { EvaluationCodeDto } from './dto/evaluation-code.dto'
import { GetAllEvaluationsBodyDto } from './dto/get-all-evaluations-body.dto'
import { GetAllEvaluationsQueryDto } from './dto/get-all-evaluations-query.dto'
import { Evaluation } from './evaluations.model'
import { User } from 'src/users/users.model'

@Injectable()
export class EvaluationsService {
	constructor(
		@InjectModel(Evaluation) private evaluationRepository: typeof Evaluation,
		@InjectModel(Criterion) private criterionRepository: typeof Criterion,
    @InjectModel(User) private userRepository: typeof User,
		private fileService: FilesService,
		private codesService: CodesService,
		private categoriesService: CategoriesService
	) {}
	async createEvaluation(dto: CreateEvaluationDto, userId: number, image: any) {
		const isPrivate: boolean = JSON.parse(dto.private)
		const categories: string[] = JSON.parse(dto.categories)
		const criteria: string[] = JSON.parse(dto.criteria)

		const fileName: string | null = await this.fileService.createFile(image)
		const code = await this.codesService.generateUniqueCode()
		const evaluation = {
			title: dto.title,
			description: dto.description,
			image: fileName,
			private: isPrivate,
			ownerId: userId,
			codeId: code.id,
		}
		const newEvaluation = await this.evaluationRepository.create(evaluation)

		if (Array.isArray(categories)) {
			for (const category of categories) {
				const categoryInstance = await this.categoriesService.getById(category)
				await newEvaluation.$add('categories', categoryInstance)
			}
		}

		if (Array.isArray(criteria)) {
			for (const criterion of criteria) {
				await this.criterionRepository.create({
					title: criterion,
					evaluationId: newEvaluation.id,
				})
			}
		}
		return await this.evaluationRepository.findOne({
			where: { id: newEvaluation.id },
			include: ['code'],
		})
	}

	async getAllAvailableEvaluations(
		body?: GetAllEvaluationsBodyDto,
		query?: GetAllEvaluationsQueryDto
	) {
		const { page, limit } = query
		const offset = (page - 1) * limit
		const evaluations = await this.evaluationRepository.findAll({
			where: {
				private: false,
				status: 'active',
			},
			include: [
				{
					model: Category,
					through: {
						attributes: [],
					},
				},
				'code',
			],
			offset,
			limit,
		})

		if (body?.categories?.length) {
			return evaluations.filter(evaluation =>
				evaluation.categories.find(category =>
					body.categories.includes(category.id)
				)
			)
		}

		return evaluations
	}

	async getMyEvaluations(query?: GetAllEvaluationsQueryDto, ownerId?: number) {
		const { page, limit } = query
		const offset = (page - 1) * limit

		const evaluations = await this.evaluationRepository.findAll({
			where: {
				ownerId,
			},
			include: ['code'],
			offset,
			limit,
		})

		return evaluations
	}

	async getByCode(dto: EvaluationCodeDto, id: number) {
		const evaluations = await this.evaluationRepository.findOne({
			include: [
				'owner',
				'categories',
				{
					model: Code,
					where: { value: dto.code },
				},
				{
					model: Criterion,
					include: [
						{
							model: Comment,
							where: { userId: id },
							required: false,
						},
					],
				},
			],
		})
		return evaluations
	}

	async getAllEvaluations() {
		return await this.evaluationRepository.findAll({
			include: ['criteria', 'owner'],
		})
	}

	async finishEvaluation(id: string, ownerId: number) {
		const evaluation = await this.evaluationRepository.findOne({
			where: { id, ownerId },
		})

		if (!evaluation) {
			throw new HttpException(
				"Evaluation doesn't exist",
				HttpStatus.BAD_REQUEST
			)
		}

		await evaluation.update({ status: 'finished' })

		return evaluation
	}

	async getPassedEvaluations(userId: number, query: GetAllEvaluationsQueryDto) {
		const { page, limit } = query
		const offset = (page - 1) * limit
		return await this.evaluationRepository.findAll({
			include: [
				{
					model: Criterion,
					include: [
						{
							model: Comment,
							where: { userId },
						},
					],
				},
			],
			offset,
			limit,
		})
	}

  async finishEvaluate(id: string, userId: number) {
    const evaluation = await this.evaluationRepository.findOne({
      where: { id },
    })

    if (!evaluation) {
      throw new HttpException(
        "Evaluation doesn't exist",
        HttpStatus.BAD_REQUEST
      )
    }

    const user = await this.userRepository.findOne({ where: { id: userId } })
    
    if (!user) {
      throw new HttpException(
        "User doesn't exist",
        HttpStatus.BAD_REQUEST
      )
    }

    const evaluationCriteria = await this.criterionRepository.count({
      where: { evaluationId: id },
      include: [
        {
          model: Comment,
          where: { userId: userId },
        }
      ]
    })

    const criteriaCount = await this.criterionRepository.count({ where: { evaluationId: id } })


    console.log(criteriaCount)
    console.log(evaluationCriteria)
  
    if (evaluationCriteria === criteriaCount) {
      await user.update({balance: user.balance + 5})
    } else {
      throw new HttpException("Not all criteria are passed", HttpStatus.BAD_REQUEST)
    }

    return user;

  }
}
