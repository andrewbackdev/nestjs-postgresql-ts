// libs
import {
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	ManyToOne,
	Column,
	PrimaryGeneratedColumn,
} from 'typeorm'

// decorators
import { Post } from '@api/posts/post.entity'
import { User } from '@api/users/user.entity'
import { IsNumber, IsString } from 'class-validator'

// constants

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	@IsString()
	content: string

	@ManyToOne(() => User, user => user.comments)
	@JoinColumn()
	author: User

	@Column()
	authorId: number

	@ManyToOne(() => Post, post => post.comments)
	@JoinColumn()
	post: Post

	@Column()
	@IsNumber()
	postId: number

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	constructor(partial: Partial<Comment>) {
		Object.assign(this, partial)
	}
}
