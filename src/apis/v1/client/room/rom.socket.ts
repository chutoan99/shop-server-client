import { Socket } from 'socket.io'
import ChatService from '../chat/chat.server'

class RoomSocket {
	private readonly _chatService: ChatService
	constructor() {
		this._chatService = new ChatService()
	}

	public Room(socket: Socket) {
		socket.on('room', async (roomid: number) => {
			const chatResponse = await this._chatService.GetMessage(roomid)
			socket.emit('room', chatResponse)
		})
	}
}
export default new RoomSocket()
