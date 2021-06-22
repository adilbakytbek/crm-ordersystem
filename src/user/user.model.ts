import { Prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface UserModel extends Base {
}

export class UserModel extends TimeStamps {
	@Prop({ unique: true, required: true })
	email: string

	@Prop({ required: true })
	password: string
}
