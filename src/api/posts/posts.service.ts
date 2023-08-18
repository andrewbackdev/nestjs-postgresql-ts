// libs
import { FindManyOptions, Repository } from 'typeorm'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

// main
import { Post } from './post.entity'
import { CreatePostDto, FindPostsQueryDto, UpdatePostDto } from './dto'
import { User } from '@api/users/user.entity'
import { Comment } from '@api/comments/comment.entity'

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(Post)
		private readonly postsRepository: Repository<Post>,

		@InjectRepository(Comment)
		private readonly commentsRepository: Repository<Comment>,
	) {}

	async find(filter: FindPostsQueryDto): Promise<Post[]> {
		const defaultFilter: FindManyOptions<Post> = {
			skip: 0,
			take: 10,
			order: {
				id: 'DESC',
			},
			...filter,
		}

		return this.postsRepository.find({
			where: {},
			...defaultFilter,
		})
	}

	async create(
		createPostDto: CreatePostDto & Pick<Post, 'authorId'>,
	): Promise<Post> {
		const { authorId, ...data } = createPostDto

		return this.postsRepository.save({
			...data,
			author: new User({ id: authorId }),
		})
	}

	async update(
		updatePostDto: UpdatePostDto & Pick<Post, 'id' | 'authorId'>,
	): Promise<Post> {
		const { id, authorId, ...data } = updatePostDto

		const post = await this.postsRepository.findOne({
			where: { id },
		})

		if (!post) {
			throw new NotFoundException({ message: 'Post not found' })
		}

		if (post.authorId !== authorId) {
			throw new BadRequestException({
				message: 'Missing permissions to update post',
			})
		}

		await this.postsRepository.update(id, data)

		Object.assign(post, data)
		return post
	}

	async delete({
		id,
		authorId,
	}: {
		id: number
		authorId: number
	}): Promise<Post> {
		const post = await this.postsRepository.findOne({
			where: { id },
		})

		if (!post) {
			throw new NotFoundException({ message: 'Post not found' })
		}

		if (post.authorId !== authorId) {
			throw new BadRequestException({
				message: 'Missing permissions to delete post',
			})
		}

		await this.commentsRepository.delete({ postId: id })
		await this.postsRepository.delete(id)

		return post
	}
}
