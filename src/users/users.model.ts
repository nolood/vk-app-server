import { DataTypes } from "sequelize";
import {
  BelongsToMany,
  Column,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { Evaluation } from "src/evaluations/evaluations.model";
import { UsersEvaluations } from "../evaluations/users-evaluations.model";
import { ApiProperty } from "@nestjs/swagger";
import { Mascot } from "../mascot/mascot.model";

interface UserCreationAttributes {
  id: string;
  firstName: string;
  lastName: string;
  photo_100: string;
  photo_200: string;
  photo_base: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({
    example: "1",
    description: "Уникальный идентификатор пользователя",
  })
  @Column({ type: DataTypes.INTEGER, primaryKey: true, unique: true })
  id: number;
  @ApiProperty({
    example: "Иван",
    description: "Имя пользователя",
  })
  @Column({ type: DataTypes.STRING })
  first_name: string;
  @ApiProperty({
    example: "Иванов",
    description: "Фамилия пользователя",
  })
  @Column({ type: DataTypes.STRING })
  last_name: string;
  @ApiProperty({
    example: "https://expamle.com/photo_100",
    description: "Фото пользователя (100)",
  })
  @Column({ type: DataTypes.STRING })
  photo_100: string;
  @ApiProperty({
    example: "https://expamle.com/photo_100",
    description: "Фото пользователя (200)",
  })
  @Column({ type: DataTypes.STRING })
  photo_200: string;
  @ApiProperty({
    example: "https://expamle.com/photo_100",
    description: "Фото пользователя (Оригинал)",
  })
  @Column({ type: DataTypes.STRING })
  photo_base: string;
  @ApiProperty({
    example: "50",
    description: "Текущий баланс пользователя",
  })
  @Column({ type: DataTypes.INTEGER, defaultValue: 50 })
  balance: number;

  @ApiProperty({
    example: Mascot,
    description: "Mascot",
  })
  @HasOne(() => Mascot)
  mascot: Mascot;

  @BelongsToMany(() => Evaluation, () => UsersEvaluations)
  evaluations: Evaluation[];
}
