import { Body, Controller, Get, Post } from "@nestjs/common";
import { PlacementsService } from "./placements.service";
import { CreatePlacementDto } from "./dto/create-placement.dto";

@Controller("placements")
export class PlacementsController {
  constructor(private readonly placementsService: PlacementsService) {}
  @Post("/")
  create(@Body() dto: CreatePlacementDto) {
    return this.placementsService.createPlacement(dto);
  }

  @Get("/")
  getAll() {
    return this.placementsService.getAllPlacements();
  }
}
