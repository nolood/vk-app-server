import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Mascot } from '../mascot/mascot.model'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private usersRepository: typeof User,
		@InjectModel(Mascot) private mascotRepository: typeof Mascot
	) {}

	async createUser(dto: CreateUserDto) {
		const isUser = await this.usersRepository.findOne({
			where: { id: dto.id },
		})
		if (isUser) {
			return isUser
		}
		const user = await this.usersRepository.create(dto)
		const mascot = await this.mascotRepository.create()
		await user.$set('mascot', mascot)
		return user
	}

	async getAllUsers() {
		return this.usersRepository.findAll()
	}

	async getUserById(id: number) {
		return this.usersRepository.findOne({ where: { id } })
	}
}
