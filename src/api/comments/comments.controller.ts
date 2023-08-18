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
	Put,
	Param,
	Delete,
} from '@nestjs/common'

// decorators
import { ApiController } from '@app/decorators'

// services
import { CommentsService } from './comments.service'

// entities
import { Comment } from './comment.entity'

// DTO
import { AuthorizedRequest } from '@api/auth/auth.interface'
import { Public } from '@api/auth/decorators'
import {
	CreateCommentDto,
	FindCommentsQueryDto,
	UpdateCommentDto,
	UpdateCommentParamDto,
} from './dto'

@ApiController('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Get()
	@Public()
	async find(@Query() filter: FindCommentsQueryDto): Promise<Comment[]> {
		return this.commentsService.find(filter)
	}

	@Post()
	@HttpCode(HttpStatus.OK)
	async create(
		@Req() req: AuthorizedRequest,
		@Body() createCommentDto: CreateCommentDto,
	): Promise<Comment> {
		const { user } = req
		return this.commentsService.create({
			authorId: user.id,
			...createCommentDto,
		})
	}

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	async update(
		@Req() req: AuthorizedRequest,
		@Body() updateCommentDto: UpdateCommentDto,
		@Param() params: UpdateCommentParamDto,
	): Promise<Comment> {
		const { user } = req
		const { id } = params

		return this.commentsService.update({
			id,
			authorId: user.id,
			...updateCommentDto,
		})
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async delete(
		@Req() req: AuthorizedRequest,
		@Param() params: UpdateCommentParamDto,
	): Promise<Comment> {
		const { user } = req
		const { id } = params

		return this.commentsService.delete({
			id,
			authorId: user.id,
		})
	}
}
