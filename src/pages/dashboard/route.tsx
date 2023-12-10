import { lazy } from 'react'
import { type RouteItem } from '@/routes'
import { Navigate } from 'react-router-dom'

const dashboardRoutes: RouteItem[] = [
  {
    name: 'home',
    title: '首页',
    component: null,
    element: <Navigate to="/dashboard" />,
    path: '/'
  },
  {
    name: 'dashboard',
    title: '首页',
    component: lazy(() => import('./index')),
    path: '/dashboard'
  }
]

export default dashboardRoutes
