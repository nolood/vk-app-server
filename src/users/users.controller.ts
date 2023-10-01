import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserIdGuard } from './auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя по данным из vk' })
  @ApiResponse({ status: 200, type: User })
  @Post('create')
  create(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(UserIdGuard)
  @Get()
  getAll(@Req() req: { user: User }) {
    console.log(req.user);
    return this.usersService.getAllUsers();
  }
}
