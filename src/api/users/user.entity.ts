// libs
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IsString } from 'class-validator'

// decorators
import { Hidden } from '@app/decorators'

// constants
import { Post } from '@api/posts/post.entity'
import { Comment } from '@api/comments/comment.entity'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Index({ unique: true })
	@Column()
	@IsString()
	username: string

	@Hidden()
	@Column()
	@IsString()
	password: string

	@OneToMany(() => Post, post => post.author)
	@JoinColumn()
	posts: Post[]

	@OneToMany(() => Comment, comment => comment.author)
	@JoinColumn()
	comments: Comment[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	constructor(partial: Partial<User>) {
		Object.assign(this, partial)
	}
}
