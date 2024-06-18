import { Server, Socket } from 'socket.io'
import chatSocket from '~/apis/v1/client/chat/chat.socket'
import RoomSocket from '~/apis/v1/client/room/rom.socket'

const configSocketIO = (server: any) => {
	const io = new Server(server, {
		cors: { origin: '*' }
	})
	// Event listener for new connections
	io.on('connection', (socket: Socket) => {
		//? Chat
		chatSocket.Message(socket)

		RoomSocket.Room(socket)

		socket.on('disconnect', () => {
			console.log('A user disconnected')
		})
	})
}

export default configSocketIO
