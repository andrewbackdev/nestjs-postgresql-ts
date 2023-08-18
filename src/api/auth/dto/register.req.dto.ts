import { PickType } from '@nestjs/swagger'
import { User } from '@api/users/user.entity'

export class RegisterReqDto extends PickType(User, [
	'username',
	'password',
] as const) {}
