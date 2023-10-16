import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Accessory } from "../accessories/accessories.model";
import { Mascot } from "./mascot.model";
import { DataTypes } from "sequelize";

@Table({ tableName: "mascot_accessories", createdAt: false, updatedAt: false })
export class MascotAccessory extends Model<MascotAccessory> {
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

  @ForeignKey(() => Accessory)
  @Column({
    type: DataTypes.INTEGER,
  })
  accessoryId: number;
  @ForeignKey(() => Mascot)
  @Column({
    type: DataTypes.INTEGER,
  })
  mascotId: number;
}
