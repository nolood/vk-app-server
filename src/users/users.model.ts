import { DataTypes } from 'sequelize';
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Evaluation } from 'src/evaluations/evaluations.model';
import { UsersEvaluations } from '../evaluations/users-evaluations.model';

interface UserCreationAttributes {
  id: string;
  firstName: string;
  lastName: string;
  photo_100: string;
  photo_200: string;
  photo_base: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @Column({ type: DataTypes.INTEGER, primaryKey: true, unique: true })
  id: string;
  @Column({ type: DataTypes.STRING })
  first_name: string;
  @Column({ type: DataTypes.STRING })
  last_name: string;
  @Column({ type: DataTypes.STRING })
  photo_100: string;
  @Column({ type: DataTypes.STRING })
  photo_200: string;
  @Column({ type: DataTypes.STRING })
  photo_base: string;

  @BelongsToMany(() => Evaluation, () => UsersEvaluations)
  evaluations: Evaluation[];
}
