import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from 'src/users/users.model';
import { UsersEvaluations } from './users-evaluations.model';

interface EvaluationsCreationAttributes {
  title: string;
  image?: string;
}

@Table({ tableName: 'evaluations' })
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
}
