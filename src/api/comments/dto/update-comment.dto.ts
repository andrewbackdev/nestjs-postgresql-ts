import { toNumber } from '@app/helpers'
import { PickType } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNumber } from 'class-validator'
import { Comment } from '../comment.entity'

export class UpdateCommentDto extends PickType(Comment, ['content'] as const) {}
export class UpdateCommentParamDto {
	@Transform(toNumber)
	@IsNumber()
	id: number
}
