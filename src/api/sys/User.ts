import { defHttp } from "/@/utils/http/axios";
import { LoginParams, GetUserInfoModel, AccessToken, SsoUser } from "./model/UserModel";
import { MessageMode } from "/#/axios";
import { ContentTypeEnum } from "/@/enums/HttpEnum";

enum Api {
  Login = "/oauth2/accessToken",
  Logout = "/oauth2/user/revoke",
  GetUserInfo = "/oauth2/user/info",
  User = "/oauth2/user",
  isAccountExist = "/oauth2/user/exist",
  SendMsg = "/oauth2/sendMsg",
  Captche = "/captcha"
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: MessageMode = "modal") {
  return defHttp.post<AccessToken>(
    {
      url: Api.Login,
      params,
      headers: { "Content-Type": ContentTypeEnum.FORM_URLENCODED }
    },
    {
      errorMessageMode: mode
    }
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: "none" });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.Captche });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

/**
 * 判断帐号是否存在
 * @param account
 */
export const isAccountExist = (account: string) => {
  return defHttp.get<any>({ url: `${Api.isAccountExist}/${account}` }, { errorMessageMode: "none" });
};

export const getUserList = (params?: SsoUser) => {
  return defHttp.get<SsoUser>({ url: Api.User, params });
};

export function insertUser(params: SsoUser) {
  return defHttp.post<SsoUser>({ url: Api.User, params }, { successMessageMode: "message" });
}

export function updateUser(params: SsoUser) {
  return defHttp.put<SsoUser>({ url: Api.User, params }, { successMessageMode: "message" });
}

export function deleteUser(params: string) {
  return defHttp.delete<SsoUser>({ url: `${Api.User}/${params}` }, { successMessageMode: "message" });
}
