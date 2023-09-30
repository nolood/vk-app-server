import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id: dto.id } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }
    return this.usersRepository.create(dto);
  }

  async getAllUsers() {
    return this.usersRepository.findAll();
  }
}
