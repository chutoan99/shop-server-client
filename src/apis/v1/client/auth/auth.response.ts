import { BaseResponse } from "~/systems/other/response.system";

export interface loginResponse extends BaseResponse {
  access_token: string,
  refresh_token?: string
}