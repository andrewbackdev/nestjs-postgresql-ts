// libs
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// main
import { Post } from './post.entity'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { Comment } from '@api/comments/comment.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Post, Comment])],
	providers: [PostsService],
	controllers: [PostsController],
	exports: [PostsService],
})
export class PostsModule {}
