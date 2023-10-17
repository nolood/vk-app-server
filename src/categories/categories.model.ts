import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { EvaluationCategory } from "./evaluations-categories.model";
import { Evaluation } from "../evaluations/evaluations.model";

@Table({ tableName: "categories" })
export class Category extends Model<Category> {
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;
  @Column({ type: DataTypes.STRING })
  value: string;

  @BelongsToMany(() => Evaluation, () => EvaluationCategory)
  evaluations: Evaluation[];
}
