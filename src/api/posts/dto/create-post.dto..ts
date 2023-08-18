import { Post } from '../post.entity'
import { PickType } from '@nestjs/swagger'

export class CreatePostDto extends PickType(Post, ['title', 'body'] as const) {}
