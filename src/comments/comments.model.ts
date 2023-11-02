import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Criterion } from "../criteria/criteria.model";
import { User } from "../users/users.model";

@Table({ tableName: "comments" })
export class Comment extends Model<Comment> {
  @Column({
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: bigint;

  @Column({ type: DataTypes.INTEGER })
  score: number;

  @Column({ type: DataTypes.STRING })
  title: string;

  @ForeignKey(() => Criterion)
  @Column({ type: DataTypes.BIGINT })
  criterionId: bigint;

  @BelongsTo(() => Criterion)
  criterion: Criterion;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
