import { Column, Model, Table, BelongsToMany } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "src/users/users.model";
import { UsersEvaluations } from "./users-evaluations.model";
import { Category } from "../categories/categories.model";
import { EvaluationCategory } from "../categories/evaluations-categories.model";

interface EvaluationsCreationAttributes {
  title: string;
  image?: string;
}

@Table({ tableName: "evaluations" })
export class Evaluation extends Model<
  Evaluation,
  EvaluationsCreationAttributes
> {
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;
  @Column({ type: DataTypes.STRING })
  title: string;
  @Column({ type: DataTypes.STRING, allowNull: true })
  image?: string;
  @Column({ type: DataTypes.INTEGER })
  code: string;
  @Column({ type: DataTypes.INTEGER })
  status: string;
  @Column({ type: DataTypes.INTEGER })
  result: number;

  @BelongsToMany(() => User, () => UsersEvaluations)
  users: User[];

  @BelongsToMany(() => Category, () => EvaluationCategory)
  categories: Category[];
}
