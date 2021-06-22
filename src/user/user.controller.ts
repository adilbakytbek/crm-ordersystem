import { Body, Controller, Post } from '@nestjs/common'
import { UserDto } from './dto/user.dto'

@Controller('user')
export class UserController {

	@Post('login')
	async login(@Body() dto: UserDto) {
		return dto
	}

	@Post('register')
	async register(@Body() dto: UserDto) {
		return dto
	}

}
