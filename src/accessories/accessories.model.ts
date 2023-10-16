import { DataTypes } from "sequelize";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Placement } from "../placements/placements.model";
import { MascotAccessory } from "../mascot/mascot-accessories.model";
import { Mascot } from "../mascot/mascot.model";

@Table({ tableName: "accessories" })
export class Accessory extends Model<Accessory> {
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
  image: string;
  @Column({
    type: DataTypes.INTEGER,
  })
  price: number;

  @ForeignKey(() => User)
  user: User;

  @ForeignKey(() => Placement)
  @Column({
    type: DataTypes.INTEGER,
  })
  placementId: number;

  @BelongsTo(() => Placement)
  placement: Placement;

  @BelongsToMany(() => Mascot, () => MascotAccessory)
  mascot: Mascot[];
}
