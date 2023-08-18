// libs
import { FindManyOptions, Repository } from 'typeorm'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

// main
import { Comment } from './comment.entity'
import { CreateCommentDto, FindCommentsQueryDto, UpdateCommentDto } from './dto'
import { User } from '@api/users/user.entity'

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentsRepository: Repository<Comment>,
	) {}

	async find(filter: FindCommentsQueryDto): Promise<Comment[]> {
		const defaultFilter: FindManyOptions<Comment> = {
			skip: 0,
			take: 10,
			order: {
				id: 'DESC',
			},
			...filter,
		}

		return this.commentsRepository.find({
			where: {},
			...defaultFilter,
		})
	}

	async create(
		createCommentDto: CreateCommentDto & Pick<Comment, 'authorId' | 'postId'>,
	): Promise<Comment> {
		const { authorId, ...data } = createCommentDto
		return this.commentsRepository.save({
			...data,
			author: new User({ id: authorId }),
		})
	}

	async update(
		updateCommentDto: UpdateCommentDto & Pick<Comment, 'id' | 'authorId'>,
	): Promise<Comment> {
		const { id, authorId, ...data } = updateCommentDto

		const comment = await this.commentsRepository.findOne({
			where: { id },
		})

		if (!comment) {
			throw new NotFoundException({ message: 'Post not found' })
		}

		if (comment.authorId !== authorId) {
			throw new BadRequestException({
				message: 'Missing permissions to update post',
			})
		}

		await this.commentsRepository.update(id, data)

		Object.assign(comment, data)
		return comment
	}

	async delete({
		id,
		authorId,
	}: {
		id: number
		authorId: number
	}): Promise<Comment> {
		const comment = await this.commentsRepository.findOne({
			where: { id },
		})

		if (!comment) {
			throw new NotFoundException({ message: 'Post not found' })
		}

		if (comment.authorId !== authorId) {
			throw new BadRequestException({
				message: 'Missing permissions to delete comment',
			})
		}

		await this.commentsRepository.delete(id)

		return comment
	}
}
