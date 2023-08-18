// libs
import { Repository } from 'typeorm'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

// main
import { User } from './user.entity'
import { CreateUserReqDto, FindUsersQueryDto, UpdateUserReqDto } from './dto'
import { Post } from '@api/posts/post.entity'
import { Comment } from '@api/comments/comment.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,

		@InjectRepository(Post)
		private readonly postsRepository: Repository<Post>,

		@InjectRepository(Comment)
		private readonly commentsRepository: Repository<Comment>,
	) {}

	async find(filter: FindUsersQueryDto): Promise<User[]> {
		return this.usersRepository.find(filter)
	}

	async me(id: number): Promise<User> {
		return this.usersRepository.findOne({ where: { id } })
	}

	async create(createUserDto: CreateUserReqDto): Promise<User> {
		return this.usersRepository.save(createUserDto)
	}

	findOneById(id: number): Promise<User | null> {
		return this.usersRepository.findOne({
			where: { id },
		})
	}

	findOneByUsername(username: string): Promise<User | null> {
		return this.usersRepository.findOne({
			where: { username },
		})
	}

	async update(id: number, updateUserDto: UpdateUserReqDto): Promise<User> {
		const { username } = updateUserDto

		if (username) {
			const user = await this.usersRepository.findOne({ where: { username } })
			if (user) {
				throw new BadRequestException({ message: 'username already taken' })
			}
		}

		const user = await this.usersRepository.findOne({ where: { id } })

		if (!user) {
			throw new NotFoundException({ message: 'User not found' })
		}

		await this.usersRepository.update({ id }, updateUserDto)

		Object.assign(user, updateUserDto)
		return user
	}

	async delete(id: number): Promise<User> {
		const user = await this.usersRepository.findOne({ where: { id } })

		if (!user) {
			throw new NotFoundException({ message: 'User not found' })
		}

		await this.commentsRepository.delete({ authorId: id })
		await this.postsRepository.delete({ authorId: id })
		await this.usersRepository.delete({ id })

		return user
	}
}
