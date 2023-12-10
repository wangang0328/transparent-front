import { lazy } from 'react'
import { type RouteItem } from '@/routes'

const profileRouteList: RouteItem[] = [
  {
    name: 'login',
    title: '登录',
    layout: 'PureLayout',
    component: lazy(() => import('./login')),
    path: 'login'
  },
  {
    name: 'register',
    title: '注册',
    layout: 'PureLayout',
    component: lazy(() => import('./register')),
    path: 'register'
  }
]

export default profileRouteList
