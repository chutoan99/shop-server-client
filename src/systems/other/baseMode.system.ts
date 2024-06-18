export default class BaseModel {
	private _is_active: boolean = false
	private _createdAt: string = new Date().toISOString()
	private _updatedAt: string = new Date().toISOString()
	private _deleteAt?: null

	get is_active(): boolean {
		return this._is_active
	}
	set is_active(value: boolean) {
		this._is_active = value
	}

	get createdAt(): string {
		return this._createdAt
	}
	set createdAt(value: string) {
		this._createdAt = value
	}

	get updatedAt(): string {
		return this._updatedAt
	}
	set updatedAt(value: string) {
		this._updatedAt = value
	}

	get deleteAt(): null | undefined {
		return this._deleteAt
	}
	set deleteAt(value: null | undefined) {
		this._deleteAt = value
	}
}
