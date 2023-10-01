import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор пользователя',
  })
  readonly id: string;
  @ApiProperty({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  readonly firstName: string;
  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  readonly lastName: string;
  @ApiProperty({
    example: 'https://expamle.com/photo_100',
    description: 'Фото пользователя (100)',
  })
  readonly photo_100: string;
  @ApiProperty({
    example: 'https://expamle.com/photo_100',
    description: 'Фото пользователя (200)',
  })
  readonly photo_200: string;
  @ApiProperty({
    example: 'https://expamle.com/photo_100',
    description: 'Фото пользователя (Оригинал)',
  })
  readonly photo_base: string;
}
