// libs
import {
	Req,
	Get,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	UseInterceptors,
	ClassSerializerInterceptor,
	Query,
	Param,
	Put,
	Delete,
} from '@nestjs/common'

// decorators
import { ApiController } from '@app/decorators'

// services
import { PostsService } from './posts.service'

// entities
import { Post as PostEntity } from './post.entity'

// DTO
import {
	CreatePostDto,
	FindPostsQueryDto,
	UpdatePostDto,
	UpdatePostParamDto,
} from './dto'
import { AuthorizedRequest } from '@api/auth/auth.interface'
import { Public } from '@api/auth/decorators'

@ApiController('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get()
	@Public()
	async find(@Query() filter: FindPostsQueryDto): Promise<PostEntity[]> {
		return this.postsService.find(filter)
	}

	@Post()
	@HttpCode(HttpStatus.OK)
	async create(
		@Req() req: AuthorizedRequest,
		@Body() createPostDto: CreatePostDto,
	): Promise<PostEntity> {
		const { user } = req

		return this.postsService.create({
			authorId: user.id,
			...createPostDto,
		})
	}

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	async update(
		@Req() req: AuthorizedRequest,
		@Body() updatePostDto: UpdatePostDto,
		@Param() params: UpdatePostParamDto,
	): Promise<PostEntity> {
		const { user } = req
		const { id } = params

		return this.postsService.update({
			id,
			authorId: user.id,
			...updatePostDto,
		})
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async delete(
		@Req() req: AuthorizedRequest,
		@Param() params: UpdatePostParamDto,
	): Promise<PostEntity> {
		const { user } = req
		const { id } = params

		return this.postsService.delete({
			id,
			authorId: user.id,
		})
	}
}
