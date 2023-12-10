import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalInfoContext, LoginStatus } from '@/store'

interface LoginGuardProps {
  Component: React.ComponentType
  [key: string]: any
}

const LoginGuard: React.FC<LoginGuardProps> = ({ Component, ...restPara }) => {
  const navigate = useNavigate()
  const { loginStatus } = useGlobalInfoContext()

  if (loginStatus === LoginStatus.Unlogin) {
    // 跳到登录页面
    navigate('/login')
    return null
  }

  if (loginStatus === LoginStatus.Validating) {
    return <div>loading...</div>
  }

  return <Component {...restPara} />
}

export default LoginGuard
