// libs
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
} from '@nestjs/common'

// DTO
import { AuthPayloadDto, LoginReqDto, RegisterReqDto } from '@api/auth/dto'

// interfaces
import { JwtCreatePayload } from '@api/auth/auth.interface'

// services
import { UsersService } from '@api/users/users.service'

// config
import { BcryptConfig } from '@config/api/auth.config'
import { User } from '@api/users/user.entity'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	private async signJwt(user: User): Promise<string> {
		return this.jwtService.signAsync({ id: user.id })
	}

	async renewToken(payload: JwtCreatePayload) {
		const user = await this.usersService.findOneById(payload.id)
		return this.signJwt(user)
	}

	async register(registerUserDto: RegisterReqDto): Promise<AuthPayloadDto> {
		const { username, password } = registerUserDto

		const existedUser = await this.usersService.findOneByUsername(username)
		if (existedUser) {
			throw new BadRequestException({
				message: 'User with provided username already exists',
			})
		}

		const salt = await bcrypt.genSalt(BcryptConfig.saltRounds)
		const hashedPassword = await bcrypt.hash(password, salt)

		const user = await this.usersService.create({
			username,
			password: hashedPassword,
		})

		const jwt = await this.signJwt(user)

		return { jwt, user }
	}

	async login({ username, password }: LoginReqDto): Promise<AuthPayloadDto> {
		const user = await this.usersService.findOneByUsername(username)

		if (!user) {
			throw new UnauthorizedException({
				message: 'username or password is incorrect',
			})
		}

		const isPassMatch = await bcrypt.compare(password, user.password)
		if (!isPassMatch) {
			throw new UnauthorizedException({
				message: 'username or password is incorrect',
			})
		}

		const jwt = await this.signJwt(user)

		return { jwt, user }
	}
}
