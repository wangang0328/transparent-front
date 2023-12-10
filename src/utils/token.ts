// 根据是否有 accessToken 判断是否登录

import { LoginErrCode, refreshTOken } from './apiFetch'

export const ACCESS_TOKEN = 'TRANSPARENT_ACCESS_TOKEN'
export const REFRESH_TOKEN = 'TRANSPARENT_REFRESH_TOKEN'

export const getAccessToken = () => sessionStorage.getItem(ACCESS_TOKEN)

export const setAccessToken = (value: string) => {
  sessionStorage.setItem(ACCESS_TOKEN, value)
}

export const setRefreshToken = (value: string) => {
  localStorage.setItem(REFRESH_TOKEN, value)
}

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN)

export const isLogin = async () => {
  if (!getRefreshToken()) {
    return false
  }
  if (getAccessToken()) {
    return true
  }
  const [err] = await refreshTOken({ toastErrMsg: false })
  if (
    [LoginErrCode.NO_REFRESH_TOKEN, LoginErrCode.ACCESS_TOKEN_EXPIRED].includes(
      err?.code
    )
  ) {
    return false
  }
  return true
}
