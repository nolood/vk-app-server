import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "../users/users.model";
import { Constellation } from "./constellations.model";

@Table({ tableName: "users_constellation" })
export class UsersConstellations extends Model<UsersConstellations> {
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  userId: number;
  @ForeignKey(() => Constellation)
  @Column({ type: DataTypes.INTEGER })
  constellationId: number;
}
