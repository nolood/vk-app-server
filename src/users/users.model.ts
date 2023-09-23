import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

interface UserCreationAttributes {
  id: string;
  username: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @Column({ type: DataTypes.STRING, primaryKey: true, unique: true })
  id: string;
}
