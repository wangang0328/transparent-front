import { Suspense, useLayoutEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  AppstoreOutlined,
  // FundOutlined,
  // AlertOutlined,
  // UsergroupAddOutlined,
  ProfileOutlined,
  LinkOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, theme, Spin, message } from 'antd'
import { useGlobalInfoContext, LoginStatus } from '@/store'

const { Header, Sider, Content } = Layout

const NormalLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { loginStatus } = useGlobalInfoContext()

  const [selectedMenuKeys, defaultExpandKeys] = useMemo(() => {
    let curPathName = ''
    const tempKeys = pathname.split('/')
    tempKeys.shift()
    const targetSelectedKeys = tempKeys.map((item) => {
      curPathName = `${curPathName}/${item}`
      return curPathName
    })

    const expandKeys =
      targetSelectedKeys.length <= 1
        ? []
        : targetSelectedKeys.slice(0, targetSelectedKeys.length - 1)

    return [targetSelectedKeys, expandKeys]
  }, [pathname])

  const [openKeys, setOpenKeys] = useState(defaultExpandKeys)

  console.log('selectedMenuKeys==', selectedMenuKeys, pathname)

  useLayoutEffect(() => {
    // do
    if (loginStatus === LoginStatus.Unlogin) {
      console.log('normal-----layout')
      message.error('未获取到登录信息，请先登录')
      // 跳到登录页面
      navigate('/login')
    }
  }, [loginStatus])

  // TODO: 监听路由变化
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const handleClick = ({ key: url }: any) => navigate(url, { replace: false })

  return (
    <Spin spinning={loginStatus === LoginStatus.Validating}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{ height: '64PX' }}>logo占位符</div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedMenuKeys}
            onClick={handleClick}
            openKeys={openKeys}
            onOpenChange={(v) => {
              setOpenKeys(v)
            }}
            items={[
              {
                key: '/dashboard',
                icon: <AppstoreOutlined rev="" />,
                label: 'Dashboard'
              },
              {
                key: '/user',
                icon: <UserOutlined rev="" />,
                label: '用户管理'
              },
              {
                key: '/source',
                icon: <UploadOutlined rev="" />,
                label: '资源管理',
                children: [
                  {
                    key: '/source/menu',
                    icon: <ProfileOutlined rev="" />,
                    label: '菜单管理'
                  },
                  {
                    key: '/source/btn',
                    icon: <LinkOutlined rev="" />,
                    label: '按钮管理'
                  }
                ]
              }
              // {
              //   key: '/role',
              //   icon: <UsergroupAddOutlined rev="" />,
              //   label: '角色管理'
              // },
              // {
              //   key: '/alarm',
              //   icon: <AlertOutlined rev="" />,
              //   label: '预警设置'
              // },
              // {
              //   key: 'performance',
              //   icon: <FundOutlined rev="" />,
              //   label: '性能概览'
              // }
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined rev="" />
                ) : (
                  <MenuFoldOutlined rev="" />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            <Suspense fallback={<div>loading----</div>}>
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Spin>
  )
}

export default NormalLayout
