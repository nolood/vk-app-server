import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Evaluation } from "../evaluations/evaluations.model";

@Table({ tableName: "codes" })
export class Code extends Model<Code> {
  @Column({
    primaryKey: true,
    type: DataTypes.BIGINT,
    autoIncrement: true,
    unique: true,
  })
  id: bigint;

  @Column({ type: DataTypes.STRING, unique: true })
  value: string;

  @ForeignKey(() => Evaluation)
  @Column({ type: DataTypes.UUID })
  evaluationId: string;

  @BelongsTo(() => Evaluation)
  evaluation: Evaluation;
}
