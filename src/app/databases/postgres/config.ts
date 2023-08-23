// config
import { PostgreSqlConfig, MigrationConfig } from '@config/databases'
import { IsDevelopment, IsProduction } from '@config/runtime/runtime'

// types
import { TypeOrmTypeEnum } from '../typeorm/types'

// constants
const { Host, Port, Username, Password, Database } = PostgreSqlConfig
const { MigrationsDistGlob, MigrationsTableName, EntitiesGlob } =
	MigrationConfig

// See https://adaptable.io/docs/app-guides/deploy-nestjs-app#next-steps-connect-to-the-database
const adaptableConfig = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: true,
	entities: [EntitiesGlob],
}

const devConfig = {
	type: TypeOrmTypeEnum.Postgres,
	host: Host,
	port: Port,
	username: Username,
	password: Password,
	database: Database,
	synchronize: IsDevelopment,
	entities: [EntitiesGlob],
	migrationsTableName: MigrationsTableName,
	migrations: [MigrationsDistGlob],
}

export default IsProduction ? adaptableConfig : devConfig
