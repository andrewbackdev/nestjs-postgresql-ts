import { User } from '@api/users/user.entity'
import { PickType } from '@nestjs/swagger'

export class CreateUserReqDto extends PickType(User, [
	'username',
	'password',
] as const) {}
