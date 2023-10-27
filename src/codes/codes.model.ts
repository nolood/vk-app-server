import { Column, HasOne, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Evaluation } from "../evaluations/evaluations.model";

@Table({ tableName: "codes", createdAt: false, updatedAt: false })
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

  @HasOne(() => Evaluation)
  evaluation: Evaluation;
}
