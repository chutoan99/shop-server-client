import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2'

export type ResultResponse = [
	(
		| RowDataPacket[]
		| RowDataPacket[][]
		| OkPacket
		| OkPacket[]
		| ResultSetHeader
	),
	FieldPacket[]
]
