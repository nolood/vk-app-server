import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
	async createFile(file): Promise<string> {
		try {
			console.log(file)
			const fileName = uuid.v4() + '.' + file.originalname.split('.').at(-1)
			const filePath = path.resolve(__dirname, '..', 'static')
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true })
			}
			fs.writeFileSync(path.join(filePath, fileName), file.buffer)
			return fileName
		} catch {
			throw new HttpException(
				'Произошла ошибка при записи файла',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
}
