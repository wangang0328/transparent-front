import { Button, Card, Col, Form, Input, Row, message } from 'antd'
import { post } from '@/utils/apiFetch'
import { setAccessToken, setRefreshToken } from '@/utils'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LoginStatus, useGlobalInfoContext } from '@/store'
import { useLayoutEffect } from 'react'

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

interface LoginFormData {
  username: string
  password: string
}

interface LoginRes {
  accessToken: string
  refreshToken: string
}

const Login = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { loginStatus } = useGlobalInfoContext()

  const onLoginFormFinished = async (values: LoginFormData) => {
    const [err, data] = await post<LoginRes>('user/login', values)
    if (err) {
      return
    }
    setAccessToken(data.accessToken)
    setRefreshToken(data.refreshToken)
    const toUrl = searchParams.get('from') || '/dashboard'
    navigate(toUrl, { replace: true })
  }

  useLayoutEffect(() => {
    if (loginStatus === LoginStatus.Login) {
      navigate('/dashboard')
    }
  }, [loginStatus])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh'
      }}
    >
      <Card style={{ width: '500px' }}>
        <h2 style={{ textAlign: 'center' }}>TRANSPAEENT 前端监控平台</h2>
        <Form {...formItemLayout} form={form} onFinish={onLoginFormFinished}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '必填项不能为空' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '必填项不能为空' }]}
          >
            <Input type="password" placeholder="请输入" />
          </Form.Item>
          <Row>
            <Col span={6} style={{ textAlign: 'right', marginBottom: '10px' }}>
              <Button
                type="link"
                size="small"
                style={{ padding: '0' }}
                onClick={() => {
                  navigate('/register')
                }}
              >
                注册账号
              </Button>
            </Col>
            <Col span={14} style={{ textAlign: 'right' }}>
              <Button
                type="link"
                size="small"
                style={{ padding: '0' }}
                onClick={() => message.info('敬请期待')}
              >
                忘记密码
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={6} />
            <Col span={14}>
              <Button
                type="primary"
                style={{ width: '100%' }}
                htmlType="submit"
              >
                登录
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export default Login
