import { redisClient } from '~/configs/redis'

export default class RedisSystem {
	public async getCache(key: string): Promise<any> {
		const data = await redisClient.get(key)
		return data ? JSON.parse(data) : null
	}

	public async setCache(
		key: string,
		data: any,
		expiry: number = 3600
	): Promise<void> {
		await redisClient.set(key, JSON.stringify(data), { EX: expiry })
	}
}
