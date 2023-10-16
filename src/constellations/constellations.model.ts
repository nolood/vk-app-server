import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { UsersConstellations } from "./users-constellation.model";
import { User } from "../users/users.model";

@Table({ tableName: "constellation" })
export class Constellation extends Model<Constellation> {
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;
  @Column({ type: DataTypes.STRING })
  image: string;
  @Column({ type: DataTypes.STRING })
  info: string;

  @BelongsToMany(() => User, () => UsersConstellations)
  users: User[];
}
