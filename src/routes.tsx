import { Route, RouteProps } from 'react-router-dom'
import NormalLayout from './layout/NormalLayout'
import PureLayout from './layout/PureLayout'

import profileRoutes from './pages/profile/route'
import userRoutes from './pages/user/route'
import dashboardRoutes from './pages/dashboard/route'
import sourceRoutes from './pages/source-management/route'

type Layout = 'NormalLayout' | 'PureLayout'

export interface RouteItem {
  /**
   * 路由名称
   */
  name: string

  title: string

  /**
   * 布局模式，默认是 NormalLayout
   */
  layout?: Layout

  /**
   * 是否校验登录
   */
  validateLogin?: boolean

  component: React.LazyExoticComponent<() => JSX.Element> | null

  element?: JSX.Element

  path: string

  /**
   * 数据
   */
  meta?: Record<string, any>

  routeProps?: Partial<RouteProps>

  children?: RouteItem[]
}

const composedRoutes = [
  ...dashboardRoutes,
  // 个人信息-包括登录、注册
  ...profileRoutes,
  // 用户列表
  ...userRoutes,
  ...sourceRoutes
]

// 合并路径
const composePath = (parentPath: string, childPath: string) => {
  if (childPath.startsWith('/')) {
    return childPath
  }
  const _parentPath = parentPath.endsWith('/') ? parentPath : `${parentPath}/`
  return `${_parentPath}${childPath}`
}

const flatRoutes = (toFormatRoutes: RouteItem[]) => {
  // 拍平
  const targetRoutes: RouteItem[] = []
  const _flatRoutes = (routes: RouteItem[], parentPath: string) => {
    const len = routes.length
    let i = 0
    while (i < len) {
      const { children, ...routeItem } = routes[i]
      targetRoutes.push({
        ...routeItem,
        path: composePath(parentPath, routeItem.path)
      })
      if (children?.length) {
        _flatRoutes(children, composePath(parentPath, routeItem.path))
      }
      ++i
    }
  }
  _flatRoutes(toFormatRoutes, '')

  return targetRoutes
}

// 先分类
const classifyRoutes = (routes: RouteItem[]) => {
  const routeObj: Partial<Record<Layout, RouteItem[]>> = {}
  routes.forEach((item) => {
    const layoutName = item.layout || 'NormalLayout'
    if (!routeObj[layoutName]) {
      routeObj[layoutName] = [item]
    } else {
      routeObj[layoutName]?.push(item)
    }
  })
  return routeObj
}

export const renderRoute = () => {
  // 按照布局分类过的routes
  const classifiedRoutes = classifyRoutes(flatRoutes(composedRoutes))

  const getLayoutComponentByType = (layout: Layout) => {
    switch (layout) {
      case 'NormalLayout':
        return NormalLayout
      case 'PureLayout':
        return PureLayout
      default:
        return NormalLayout
    }
  }

  const RenderWithLayout = (layout: Layout, routes: RouteItem[]) => {
    // 默认是NormalLayout
    const LayoutComponent = getLayoutComponentByType(layout)

    // TODO:判断是否需要登录
    return (
      <Route element={<LayoutComponent />} key={layout}>
        {routes.map(({ path, component, name, element }) => {
          if (component) {
            return <Route path={path} Component={component} key={name} />
          }
          return <Route path={path} element={element || null} key={name} />
        })}
      </Route>
    )
  }

  const renderedRoutes: JSX.Element[] = []
  for (const key in classifiedRoutes) {
    if (Object.prototype.hasOwnProperty.call(classifiedRoutes, key)) {
      renderedRoutes.push(
        RenderWithLayout(key as Layout, classifiedRoutes[key as Layout] || [])
      )
    }
  }
  return renderedRoutes
}
