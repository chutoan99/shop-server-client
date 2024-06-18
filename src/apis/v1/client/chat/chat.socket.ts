import { Socket } from 'socket.io'
import ChatService from './chat.server'

class ChatSocket {
	private readonly _chatService: ChatService
	constructor() {
		this._chatService = new ChatService()
	}

	public Message(socket: Socket) {
		socket.on('message', async (response: any) => {
			if (!+response?.user?.userid) return
			try {
				const item = await this._chatService.SaveAndGetMessage(response)
				socket.emit('message', item)
			} catch (error) {
				console.error('Error:', error)
			}
		})
	}
}
export default new ChatSocket()
