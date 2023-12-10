import React, { useContext, useEffect, useState } from 'react'

import { get } from '@/utils'

export interface UserInfo {
  id: string
  username: string
  nickName: string
  email: string
  headPic: string
  phoneNumber: string
  isFrozen: true
  isAdmin: true
  createTime: string
  roles: string[]
  permissions: string[]
}

export enum LoginStatus {
  Login = 'login',
  Unlogin = 'unlogin',
  Validating = 'validating'
}

interface GlobalInfo {
  userInfo: UserInfo | null
  loginStatus: LoginStatus
  setUserInfo: (v: UserInfo | null) => void
  // setLoginStatus: React.Dispatch<React.SetStateAction<LoginStatus>>
}

const noop = () => {
  // do nothing
}

const GlobalInfoContext = React.createContext<GlobalInfo>({
  userInfo: null,
  loginStatus: LoginStatus.Validating,
  setUserInfo: noop
})

export const GlobalInfoProvider = ({ children }: { children: JSX.Element }) => {
  const [userInfo, _setUserInfo] = useState<GlobalInfo['userInfo']>(null)
  const [loginStatus, setLoginStatus] = useState(LoginStatus.Validating)

  const setUserInfo = (v: UserInfo | null) => {
    if (v === null) {
      setLoginStatus(LoginStatus.Unlogin)
    } else {
      setLoginStatus(LoginStatus.Login)
    }
    _setUserInfo(v)
  }

  useEffect(() => {
    // 获取userInfo
    const fetchUserInfo = async () => {
      setLoginStatus(LoginStatus.Validating)
      const [err, detail] = await get<UserInfo>('user/info', null, {
        customOptions: {
          toastErrMsg: false
        }
      })
      console.log('GET--Info---')
      if (err) {
        setUserInfo(null)
        setLoginStatus(LoginStatus.Unlogin)
        return
      }
      setUserInfo(detail)
      setLoginStatus(LoginStatus.Login)
    }
    fetchUserInfo()
  }, [])

  return (
    <GlobalInfoContext.Provider
      value={{
        userInfo,
        loginStatus,
        setUserInfo
      }}
    >
      {children}
    </GlobalInfoContext.Provider>
  )
}

export const useGlobalInfoContext = () => {
  return useContext(GlobalInfoContext)
}
