import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from './user.model'
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { UserDto } from './dto/user.dto'
import { compare, genSalt, hash, hashSync } from 'bcryptjs'
import { exec } from 'child_process'
import { PASSWORD_INVALID, USER_FOUND } from './user.constants'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService,
	) {
	}

	async create(dto: UserDto) {
		const salt = await genSalt(10)
		return new this.userModel({
			email: dto.email,
			password: hash(dto.password, salt),
		}).save()
	}

	async findUser(email: string): Promise<DocumentType<UserModel> | null> {
		return this.userModel.findOne({ email }).exec()
	}

	async validateUser(dto: UserDto): Promise<Pick<UserModel, 'email'>> {
		const user = await this.findUser(dto.email)

		if (!user) {
			throw new UnauthorizedException(PASSWORD_INVALID)
		}

		const isCorrectPassword = await compare(dto.password, user.password)
		if (!isCorrectPassword) {
			throw new UnauthorizedException(PASSWORD_INVALID)
		}

		return { email: user.email }

	}

	async login(email: string) {
		const payload = { email }
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}

}
