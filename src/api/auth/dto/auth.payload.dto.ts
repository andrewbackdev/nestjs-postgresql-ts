import { User } from '@api/users/user.entity'

export class AuthPayloadDto {
	jwt: string
	user: User
}
