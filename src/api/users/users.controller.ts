// libs
import {
	Req,
	Get,
	Body,
	HttpCode,
	HttpStatus,
	UseInterceptors,
	ClassSerializerInterceptor,
	Put,
	Delete,
	Query,
} from '@nestjs/common'

// decorators
import { ApiController } from '@app/decorators'

// services
import { UsersService } from './users.service'

// entities
import { User } from '@api/users/user.entity'

// DTO
import { FindUsersQueryDto, UpdateUserReqDto } from './dto'
import { AuthorizedRequest } from '@api/auth/auth.interface'
import { Public } from '@api/auth/decorators'

@ApiController('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@Public()
	async find(@Query() filter: FindUsersQueryDto): Promise<User[]> {
		return this.usersService.find(filter)
	}

	@Get('me')
	async me(@Req() req: AuthorizedRequest): Promise<User> {
		const { user } = req

		return this.usersService.me(user.id)
	}

	@Put()
	@HttpCode(HttpStatus.OK)
	async update(
		@Req() req: AuthorizedRequest,
		@Body() updateUserDto: UpdateUserReqDto,
	): Promise<User> {
		const { user } = req

		return this.usersService.update(user.id, updateUserDto)
	}

	@Delete()
	@HttpCode(HttpStatus.OK)
	async delete(@Req() req: AuthorizedRequest): Promise<User> {
		const { user } = req
		return this.usersService.delete(user.id)
	}
}
