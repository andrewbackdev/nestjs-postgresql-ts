import { User } from '@api/users/user.entity'
import { FastifyRequest } from 'fastify'

export type JwtCreatePayload = Pick<User, 'id'>

export interface JwtPayload extends JwtCreatePayload {
	iat: number
	exp: number
}

export interface AuthorizedRequest extends FastifyRequest {
	user: JwtCreatePayload
}

export type PublicRequest = FastifyRequest
