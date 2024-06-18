export interface loginResponse {
  err: number,
  msg: string,
  access_token: string,
  refresh_token?: string
}