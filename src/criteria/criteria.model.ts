import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Evaluation } from "../evaluations/evaluations.model";
import { Comment } from "../comments/comments.model";

@Table({ tableName: "criteria" })
export class Criterion extends Model<Criterion> {
  @Column({
    primaryKey: true,
    type: DataTypes.BIGINT,
    autoIncrement: true,
    unique: true,
  })
  id: bigint;

  @Column({ type: DataTypes.STRING })
  title: string;

  @Column({ type: DataTypes.INTEGER })
  score: number;

  @BelongsTo(() => Evaluation)
  evaluation: Evaluation;

  @ForeignKey(() => Evaluation)
  @Column({ type: DataTypes.UUID })
  evaluationId: string;

  @HasMany(() => Comment)
  comments: Comment[];
}
