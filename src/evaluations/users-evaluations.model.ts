import { DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Evaluation } from 'src/evaluations/evaluations.model';
import { User } from '../users/users.model';

@Table({ tableName: 'users_evaluations', createdAt: false, updatedAt: false })
export class UsersEvaluations extends Model<UsersEvaluations> {
  @Column({ type: DataTypes.INTEGER, primaryKey: true, unique: true })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  userId: number;

  @ForeignKey(() => Evaluation)
  @Column({ type: DataTypes.INTEGER })
  evaluationId: number;
}
