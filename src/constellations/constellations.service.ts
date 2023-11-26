import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Constellation } from "./constellations.model";
import data from "../data";
import { User } from "../users/users.model";

@Injectable()
export class ConstellationsService implements OnModuleInit {
  constructor(
    @InjectModel(Constellation)
    private readonly constellationRepository: typeof Constellation,
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async onModuleInit() {
    for (let i = 0; i < data.length; i++) {
      const constellation = await this.constellationRepository.findOne({
        where: { name: data[i].name },
      });
      if (!constellation) {
        await this.constellationRepository.create(data[i]);
      }
    }
  }

  async getConstellation(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user.balance < 10) {
      throw new HttpException("Not enough balance", HttpStatus.BAD_REQUEST);
    }

    const count = await this.constellationRepository.count();
    const constellationId = Math.floor(Math.random() * (count - 1 + 1)) + 1;
    const constellation = await this.constellationRepository.findOne({
      where: { id: constellationId },
    });

    if (!constellation) {
      throw new HttpException("server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await user.$add("constellation", constellation.id);
    const newBalance = user.balance - 10;
    await user.update({ balance: newBalance });


    return constellation;
  }


  async getAllConstellationsByUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: ["constellations"],
    });

    const constellations = user.constellations;

    //if (!constellations) {
      //return [];
    //}

    return constellations;
  }
}
