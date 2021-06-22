import { TypegooseModuleOptions } from 'nestjs-typegoose'
import { ConfigService } from '@nestjs/config'

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoUri(configService),
		...getMongoOptions(),
	}
}

const getMongoUri = (configService: ConfigService): string => {
	return `mongodb+srv://${configService.get<string>('MONGO_USER')}:${configService.get<string>('MONGO_PASSWORD')}@crm-cluster.bqhgo.mongodb.net/${configService.get('MONGO_DB')}?retryWrites=true&w=majority`
}

const getMongoOptions = () => ({
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
})
