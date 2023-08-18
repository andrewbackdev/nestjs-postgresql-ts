import { User } from '@api/users/user.entity'

export class RegisterResDto {
	jwt: string
	user: User
}
