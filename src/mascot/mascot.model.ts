import { DataTypes } from "sequelize";
import { BelongsTo, Column, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";

@Table({ tableName: "mascot" })
export class Mascot extends Model<Mascot> {
  @ApiProperty({
    example: "1",
    description: "Уникальный идентификатор маскота",
  })
  @Column({ type: DataTypes.INTEGER, primaryKey: true, unique: true })
  id: number;

  @BelongsTo(() => User)
  user: User;
}
