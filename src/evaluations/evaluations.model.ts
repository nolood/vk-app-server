import { DataTypes } from 'sequelize'
import {
	BelongsTo,
	BelongsToMany,
	Column,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { Category } from '../categories/categories.model'
import { EvaluationCategory } from '../categories/evaluations-categories.model'
import { Code } from '../codes/codes.model'
import { Criterion } from '../criteria/criteria.model'

interface EvaluationsCreationAttributes {
	title: string
	description: string
	private: boolean
	ownerId: number
	codeId: bigint
	image?: string
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
	id: string

	@Column({ type: DataTypes.STRING })
	title: string

	@Column({ type: DataTypes.STRING(500) })
	description: string

	@Column({ type: DataTypes.STRING, allowNull: true })
	image?: string

	@Column({ type: DataTypes.STRING, defaultValue: 'active' })
	status: string

	@Column({ type: DataTypes.BOOLEAN, defaultValue: false })
	private: boolean

	@Column({ type: DataTypes.INTEGER, defaultValue: 0 })
	scoreCount: number

	@Column({ type: DataTypes.INTEGER, defaultValue: 0 })
	avgScore: number

	@HasMany(() => Criterion)
	criteria: Criterion[]

	@BelongsTo(() => User)
	owner: User

	@ForeignKey(() => User)
	@Column({ type: DataTypes.INTEGER })
	ownerId: number

	@BelongsToMany(() => Category, () => EvaluationCategory)
	categories: Category[]

	@ForeignKey(() => Code)
	@Column({ type: DataTypes.BIGINT })
	codeId: bigint

	@BelongsTo(() => Code)
	code: Code
}
