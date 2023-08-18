import { Comment } from '../comment.entity'
import { PickType } from '@nestjs/swagger'

export class CreateCommentDto extends PickType(Comment, [
	'content',
	'postId',
] as const) {}
