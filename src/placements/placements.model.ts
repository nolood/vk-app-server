import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Accessory } from "../accessories/accessories.model";

interface PlacementCreationAttributes {
  value: string;
}

@Table({ tableName: "placements" })
export class Placement extends Model<Placement, PlacementCreationAttributes> {
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
    unique: true,
  })
  value: string;

  @HasMany(() => Accessory)
  accessories: Accessory[];
}
