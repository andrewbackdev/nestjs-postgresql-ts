// libs
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

// constants
import { User } from '@api/users/user.entity'
import { Comment } from '@api/comments/comment.entity'
import { IsString } from 'class-validator'

@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	@IsString()
	title: string

	@Column('text')
	@IsString()
	body: string

	@ManyToOne(() => User, user => user.posts)
	@JoinColumn()
	author: User

	@Column()
	authorId: number

	@OneToMany(() => Comment, comment => comment.post)
	@JoinColumn()
	comments: Comment[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	constructor(partial: Partial<Post>) {
		Object.assign(this, partial)
	}
}
