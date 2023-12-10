import { lazy } from 'react'
import { type RouteItem } from '@/routes'

const userRouteList: RouteItem[] = [
  {
    name: 'userList',
    title: '用户列表',
    layout: 'NormalLayout',
    component: lazy(() => import('./list')),
    path: '/user'
  },
  {
    name: 'userDetail',
    title: '用户详情',
    layout: 'NormalLayout',
    component: lazy(() => import('./detail')),
    path: '/user/detail'
  }
]

export default userRouteList
