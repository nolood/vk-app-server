import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Category } from "./categories.model";
import { Evaluation } from "../evaluations/evaluations.model";

@Table({
  tableName: "evaluations_categories",
  createdAt: false,
  updatedAt: false,
})
export class EvaluationCategory extends Model<EvaluationCategory> {
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;
  @ForeignKey(() => Evaluation)
  @Column({
    type: DataTypes.INTEGER,
  })
  evaluationId: number;
  @ForeignKey(() => Category)
  @Column({
    type: DataTypes.INTEGER,
  })
  categoryId: number;
}
