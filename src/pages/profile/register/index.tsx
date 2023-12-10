import { Button, Card, Col, Form, Input, Row, Space, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const Register = () => {
  const [form] = Form.useForm()
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
        <Form {...formItemLayout} form={form}>
          <Form.Item label="用户名" name="username">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="昵称" name="nickName">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="确认密码" name="ensurePassword">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label={
              <>
                <>手机号</>
                <Tooltip title="后面会使用手机号验证码登录">
                  <QuestionCircleOutlined rev="" />
                </Tooltip>
              </>
            }
            name="phnoeNumber"
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="验证码">
            <Space>
              <Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: 'Username is required' }]}
              >
                <Input style={{ width: 152 }} placeholder="请输入" />
              </Form.Item>
              <Button style={{ width: 100 }}>获取验证码</Button>
            </Space>
          </Form.Item>
        </Form>
        <Row>
          <Col span={6} />
          <Col span={14} style={{ textAlign: 'right' }}>
            <Button
              type="link"
              size="small"
              style={{ padding: '0', marginBottom: '5px' }}
            >
              已有账号？去登录
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={6} />
          <Col span={14}>
            <Button type="primary" style={{ width: '100%' }}>
              注册
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Register
