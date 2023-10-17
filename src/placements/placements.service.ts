import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Placement } from "./placements.model";
import { CreatePlacementDto } from "./dto/create-placement.dto";

@Injectable()
export class PlacementsService {
  constructor(
    @InjectModel(Placement) private placementsRepository: typeof Placement,
  ) {}

  async getPlacementByValue(value: string) {
    const placement = await this.placementsRepository.findOne({
      where: { value },
    });

    if (!placement) {
      throw new HttpException("Placement not found", HttpStatus.FORBIDDEN);
    }

    return placement;
  }
  async createPlacement(dto: CreatePlacementDto) {
    const placement = await this.placementsRepository.findOne({
      where: { value: dto.value },
    });

    if (!placement) {
      return this.placementsRepository.create(dto);
    }

    return placement;
  }

  getAllPlacements() {
    return this.placementsRepository.findAll();
  }
}
