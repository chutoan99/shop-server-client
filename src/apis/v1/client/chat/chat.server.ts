import { generateChatId } from '~/helpers/generateId'
import ChatModel from './chat.schema'

export default class ChatService {
	public SaveAndGetMessage = async (payload: any) => {
		const newChat = new ChatModel({
			id: generateChatId(),
			room_id: payload.roomid,
			content: {
				mess: payload.message
			},
			from_id: +payload.user.userid,
			from_user_name: payload.user.name,
			to_id: +payload.shop.userid,
			to_user_name: payload.shop.username
		})
		await newChat.save()
		const chats = ChatModel.find({ room_id: payload.roomid })
		return chats
	}

	public GetMessage = async (roomid: number) => {
		const chats = ChatModel.find({ room_id: roomid })
		return chats
	}
}
