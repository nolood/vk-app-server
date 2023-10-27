import { DataTypes } from 'sequelize'
import {
	BelongsTo,
	Column,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Comment } from '../comments/comments.model'
import { Evaluation } from '../evaluations/evaluations.model'

@Table({ tableName: 'criteria' })
export class Criterion extends Model<Criterion> {
	@Column({
		primaryKey: true,
		type: DataTypes.BIGINT,
		autoIncrement: true,
		unique: true,
	})
	id: bigint

	@Column({ type: DataTypes.STRING })
	title: string

	@Column({ type: DataTypes.INTEGER, defaultValue: 0 })
	score: number

	@BelongsTo(() => Evaluation)
	evaluation: Evaluation

	@ForeignKey(() => Evaluation)
	@Column({ type: DataTypes.UUID })
	evaluationId: string

	@HasMany(() => Comment)
	comments: Comment[]
}
