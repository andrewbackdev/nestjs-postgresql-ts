// libs
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'

// databases
import { PostgreSqlDatabaseModule } from './app/databases'

// middlewares
import { LoggerMiddleware } from './app/middlewares'

// guards
import { RateLimitModule } from './app/guards'

// api
import { AuthModule } from '@api/auth/auth.module'
import { UsersModule } from '@api/users/users.module'
import { PostsModule } from '@api/posts/posts.module'
import { CommentsModule } from '@api/comments/comments.module'

@Module({
	imports: [
		// Databases
		PostgreSqlDatabaseModule,

		// Guards
		RateLimitModule,

		// API
		AuthModule,
		UsersModule,
		PostsModule,
		CommentsModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*')
	}
}
