// libs
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// main
import { User } from './user.entity'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { Post } from '@api/posts/post.entity'
import { Comment } from '@api/comments/comment.entity'

@Module({
	imports: [TypeOrmModule.forFeature([User, Post, Comment])],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
