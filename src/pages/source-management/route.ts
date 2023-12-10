import { lazy } from 'react'
import { type RouteItem } from '@/routes'

const userRouteList: RouteItem[] = [
  {
    name: 'menuManagement',
    title: '菜单列表',
    layout: 'NormalLayout',
    component: lazy(() => import('./MenuManagement')),
    path: '/source/menu'
  },
  {
    name: 'btnManagement',
    title: '按钮列表',
    layout: 'NormalLayout',
    component: lazy(() => import('./BtnManagement')),
    path: '/source/btn'
  }
]

export default userRouteList
