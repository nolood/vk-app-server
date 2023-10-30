import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserIdGuard } from "src/users/auth.guard";
import { User } from "src/users/users.model";
import { CreateEvaluationDto } from "./dto/create-evaluation.dto";
import { EvaluationsService } from "./evaluations.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetAllEvaluationsQueryDto } from "./dto/get-all-evaluations-query.dto";
import { GetAllEvaluationsBodyDto } from "./dto/get-all-evaluations-body.dto";

@Controller("evaluations")
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @UseGuards(UserIdGuard)
  @Post("create")
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() dto: CreateEvaluationDto,
    @Req() req: { user: User },
    @UploadedFile() image: any,
  ) {
    return this.evaluationsService.createEvaluation(dto, req.user.id, image);
  }

  // @UseGuards(UserIdGuard)
  @Post("/all")
  getAllAvailableEvaluations(
    @Query() query: GetAllEvaluationsQueryDto,
    @Body() body: GetAllEvaluationsBodyDto,
  ) {
    return this.evaluationsService.getAllAvailableEvaluations(body, query);
  }

  // @UseGuards(UserIdGuard)
  @Get("/")
  getAll() {
    return this.evaluationsService.getAllEvaluations();
  }
}
