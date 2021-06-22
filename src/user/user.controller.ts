import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'
import { USER_FOUND } from './user.constants'

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService) {
	}

	@Post('login')
	async login(@Body() dto: UserDto) {
		const { email } = await this.userService.validateUser(dto)
		return this.userService.login(email)
	}

	@Post('register')
	async register(@Body() dto: UserDto) {
		const candidate = await this.userService.findUser(dto.email)

		if (candidate) {
			throw new BadRequestException(USER_FOUND)
		}

		return this.userService.create(dto)

	}

}
