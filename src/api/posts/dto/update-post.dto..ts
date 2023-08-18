import { IsNumber } from 'class-validator'
import { Post } from '../post.entity'
import { PickType } from '@nestjs/swagger'
import { toNumber } from '@app/helpers'
import { Transform } from 'class-transformer'

export class UpdatePostDto extends PickType(Post, ['title', 'body'] as const) {}
export class UpdatePostParamDto {
	@Transform(toNumber)
	@IsNumber()
	id: number
}
