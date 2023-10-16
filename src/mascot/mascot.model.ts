import { DataTypes } from "sequelize";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Accessory } from "../accessories/accessories.model";
import { MascotAccessory } from "./mascot-accessories.model";

@Table({ tableName: "mascot" })
export class Mascot extends Model<Mascot> {
  @ApiProperty({
    example: "1",
    description: "Уникальный идентификатор маскота",
  })
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @BelongsToMany(() => Accessory, () => MascotAccessory)
  accessories: Accessory[];

  @ForeignKey(() => User)
  user: User;
}
