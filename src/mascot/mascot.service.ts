import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Mascot } from "./mascot.model";

@Injectable()
export class MascotService {
  constructor(@InjectModel(Mascot) private mascotRepository: typeof Mascot) {}
  createMascot() {
    return this.mascotRepository.create({});
  }
}
