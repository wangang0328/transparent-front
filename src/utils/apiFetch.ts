import axios, { AxiosRequestConfig } from 'axios'
import { isNil } from 'lodash-es'
import { message } from 'antd'
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken
} from './token'

export enum LoginErrCode {
  /**
   * 未获取到 accesstoken
   */
  NO_ACCESS_TOKEN = 1002,

  /**
   * accessToken 失效
   */
  ACCESS_TOKEN_EXPIRED = 1003,

  /**
   * 未获取到 refresh token
   */
  NO_REFRESH_TOKEN = 1004,

  /**
   * refreshToken 登录信息失效
   */
  REFRESH_TOKEN_EXPIRED = 1005
}

const accessTokenErrCodes = [
  LoginErrCode.ACCESS_TOKEN_EXPIRED,
  LoginErrCode.NO_ACCESS_TOKEN
]

interface CustomOptions {
  /**
   * 是否过滤掉无效值 undefined null 空字符串，默认 true
   */
  cleanParams?: boolean

  /**
   * 当返回错误时，是否toast报错信息，默认true
   */
  toastErrMsg?: boolean

  /**
   * 是否返回所有的数据，不做res的过滤，默认 false
   */
  getAllData?: boolean
}

interface Data {
  [key: string]: any
}

interface CustomAxiosRequestConfig
  extends Omit<AxiosRequestConfig, 'data' | 'params'> {
  customOptions: CustomOptions
}

const OK_STATUS_CODE = 200

const getErrorMsg = (msg?: string) => msg || '未知错误'

// 清空参数
const cleanRequestData = (data: Data | null | undefined) => {
  if (!data) {
    return data
  }
  const target: Data = {}
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const v = data[key]
      if (isNil(v) || v === '') {
        continue
      }
      target[key] = v
    }
  }
  return target
}

const defaultOptions: CustomOptions = {
  cleanParams: true,
  getAllData: false,
  toastErrMsg: true
}

export const refreshTOken = async (options: CustomOptions = {}) => {
  const refreshToken = getRefreshToken()
  // if (!refreshToken) {
  //   return [{ code: LoginErrCode.NO_REFRESH_TOKEN }, null]
  // }
  const [err, data] = await get(
    'user/refreshToken',
    { token: refreshToken },
    { customOptions: options }
  )
  if (err) {
    return [err, data]
  }
  setRefreshToken(data.refreshToken)
  setAccessToken(data.accessToken)
  return [err, data]
}

// 请求拦截
axios.interceptors.request.use((config) => {
  const accessToken = getAccessToken() || ''
  config.headers.authorization = `Bearer ${accessToken}`
  // 添加 ACCESS_TOKEN
  return config
})

axios.interceptors.response.use(async (response) => {
  if (
    accessTokenErrCodes.includes(response.data.code) &&
    !response.config.url?.includes('user/refreshToken')
  ) {
    const [err] = await refreshTOken()
    setTimeout(() => {
      console.log('delay---')
    }, 5)
    // TODO: 可能是别的异常 弹窗-登录跳转
    if (err) {
      return response
    }
    return axios(response.config)
  }
  // TODO：拦截处理
  return response
})

interface ErrorResInfo {
  message: string
  code: number | null
}

function apiFetch<T = any>(
  method: 'get' | 'delete' | 'head' | 'options',
  url: string,
  data: undefined,
  params: Data | null,
  config: CustomAxiosRequestConfig
): Promise<[null | ErrorResInfo, T]>

function apiFetch<T = any>(
  method: 'post' | 'put' | 'patch',
  url: string,
  data: Data | null,
  params: undefined,
  config: CustomAxiosRequestConfig
): Promise<[null | ErrorResInfo, T]>

async function apiFetch(
  method: 'get' | 'post' | 'delete' | 'head' | 'options' | 'put' | 'patch',
  url: string,
  reqData: undefined | null | Data,
  reqParams: undefined | null | Data,
  config: CustomAxiosRequestConfig
) {
  const { customOptions, ...restConfig } = config
  const { cleanParams, getAllData, toastErrMsg } = {
    ...defaultOptions,
    ...customOptions
  }

  let targetUrl = url
  // 处理url
  if (!url.startsWith('http') && !url.startsWith('/')) {
    targetUrl = `http://localhost:8000/${url}`
  }

  const targetReqParams = cleanParams ? cleanRequestData(reqParams) : reqParams
  const targetReqData = cleanParams ? cleanRequestData(reqData) : reqData

  const targetConfig = {
    ...restConfig,
    params: targetReqParams
  }

  try {
    // const
    const { data } =
      reqData === undefined
        ? await axios[method](targetUrl, targetConfig)
        : await axios[method](targetUrl, targetReqData!, targetConfig)

    // 失败
    if (data.code !== OK_STATUS_CODE) {
      if (toastErrMsg) {
        message.error(getErrorMsg(data.message))
      }
      return [data, null]
    }

    if (getAllData) {
      // 返回所有数据
      return [null, data]
    }
    // 返回处理后的数据
    return [null, data.data]
  } catch (error: any) {
    const msg = getErrorMsg(error?.message)
    if (toastErrMsg) {
      message.error(msg)
    }
    return [{ message: msg, code: null }, null]
  }
}

export const get = <T = any, D extends Data = Data>(
  url: string,
  data?: D | null,
  config: CustomAxiosRequestConfig = {
    customOptions: {}
  }
) => {
  return apiFetch<T>('get', url, undefined, data ?? null, config)
}

export const post = <T = any, D extends Data = Data>(
  url: string,
  data?: D | null,
  config: CustomAxiosRequestConfig = {
    customOptions: {}
  }
) => apiFetch<T>('post', url, data ?? null, undefined, config)
