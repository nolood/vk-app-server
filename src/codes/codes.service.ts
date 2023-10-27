import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Code } from "./codes.model";

@Injectable()
export class CodesService {
  constructor(@InjectModel(Code) private codeRepository: typeof Code) {}

  async generateUniqueCode() {
    let code: string;
    let isUnique: boolean;

    do {
      code = this.generateRandomCode();
      isUnique = await this.isCodeUnique(code);
    } while (!isUnique);

    const newCode = await this.codeRepository.create({
      value: code,
    });

    return newCode;
  }

  private generateRandomCode(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const codeLength = 6;
    let code = "";

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }

  private async isCodeUnique(code: string): Promise<boolean> {
    const existingCode = await this.codeRepository.findOne({
      where: { value: code },
    });

    return !existingCode;
  }
}
