import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2'

export type BaseResponse = [
	(
		| RowDataPacket[]
		| RowDataPacket[][]
		| OkPacket
		| OkPacket[]
		| ResultSetHeader
	),
	FieldPacket[]
]

export type CustomResponse =
	| RowDataPacket[]
	| RowDataPacket[][]
	| OkPacket
	| OkPacket[]
	| ResultSetHeader
	| [ResultSetHeader, FieldPacket[]]
