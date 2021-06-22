import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserService } from './user.service';
import { UserModel } from './user.model'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJWTConfig } from '../configs/jwt.config'

@Module({
	controllers: [UserController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'Users',
				},
			},
		]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		})
	],
	providers: [UserService],
})
export class UserModule {
}
