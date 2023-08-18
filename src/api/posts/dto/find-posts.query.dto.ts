import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, Min } from 'class-validator'
import { Transform } from 'class-transformer'
import { toNumber } from '@app/helpers'

export class FindPostsQueryDto {
	@ApiProperty()
	@Transform(toNumber)
	@IsNumber()
	@Min(0)
	skip: number

	@ApiProperty()
	@Transform(toNumber)
	@IsNumber()
	@Min(0)
	take: number
}
