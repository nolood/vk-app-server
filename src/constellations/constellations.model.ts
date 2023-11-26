import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { UsersConstellations } from "./users-constellation.model";
import { User } from "../users/users.model";

@Table({ tableName: "constellation" })
export class Constellation extends Model<Constellation> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: string;
  @Column({ type: DataTypes.STRING })
  title: string
  @Column({ type: DataTypes.STRING })
  name: string;

  @BelongsToMany(() => User, () => UsersConstellations)
  users: User[];
}
