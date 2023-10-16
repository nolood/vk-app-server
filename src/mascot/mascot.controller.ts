import { Controller, Post } from "@nestjs/common";
import { MascotService } from "./mascot.service";

@Controller("mascot")
export class MascotController {
  constructor(private readonly mascotService: MascotService) {}

  @Post("/create")
  create() {
    return this.mascotService.createMascot();
  }
}
