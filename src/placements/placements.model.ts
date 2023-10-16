import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Accessory } from "../accessories/accessories.model";

@Table({ tableName: "placements" })
export class Placement extends Model<Placement> {
  @ApiProperty({
    example: "1",
    description: "Уникальный идентификатор маскота",
  })
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataTypes.STRING,
  })
  value: string;

  @HasMany(() => Accessory)
  accessories: Accessory[];
}
