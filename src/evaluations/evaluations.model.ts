import {
  Column,
  Model,
  Table,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "src/users/users.model";
import { Category } from "../categories/categories.model";
import { EvaluationCategory } from "../categories/evaluations-categories.model";
import { Criterion } from "../criteria/criteria.model";
import { Code } from "../codes/codes.model";

interface EvaluationsCreationAttributes {
  title: string;
  description: string;
  private: boolean;
  ownerId: number;
  codeId: bigint;
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

  @Column({ type: DataTypes.STRING })
  description: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  image?: string;

  @Column({ type: DataTypes.STRING, defaultValue: "active" })
  status: string;

  @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
  private: boolean;

  @HasMany(() => Criterion)
  criteria: Criterion[];

  @BelongsTo(() => User)
  owner: User;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  ownerId: number;

  @BelongsToMany(() => Category, () => EvaluationCategory)
  categories: Category[];

  @ForeignKey(() => Code)
  @Column({ type: DataTypes.BIGINT })
  codeId: bigint;

  @BelongsTo(() => Code)
  code: Code;
}
