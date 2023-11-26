import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ConstellationsService } from "./constellations.service";
import { UserIdGuard } from "../users/auth.guard";
import { User } from "../users/users.model";

@Controller("constellations")
export class ConstellationsController {
  constructor(private readonly constellationService: ConstellationsService) {}

  @UseGuards(UserIdGuard)
  @Get("/")
  getItem(@Req() req: { user: User }) {
    return this.constellationService.getConstellation(req.user.id);
  }

  @UseGuards(UserIdGuard) 
  @Get("/byuser")
  getByUser(@Req() req: { user: User }) {
    return this.constellationService.getAllConstellationsByUser(req.user.id);
  }
}
