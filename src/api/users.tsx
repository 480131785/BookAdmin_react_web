import { http } from "../config/http";

interface LoginParams {
  name: string;
  password?: string;
  picture?: string | ArrayBuffer | null | undefined;
  admin?: number;
}

export function postLogin(option: LoginParams) {
  return http({
    url: "/users/login",
    method: "post",
    data: option,
  });
}

export function postRegister(option: LoginParams) {
  return http({
    url: "/users/register",
    method: "post",
    data: option,
  });
}

export function postPicture(option: LoginParams) {
  return http({
    url: "/users/picture",
    method: "post",
    data: option,
  });
}

export function authLogin() {
  return http({
    url: "/users/isLogin",
    method: "get",
  });
}
