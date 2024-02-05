import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
class ZQRequest {
  instance: AxiosInstance
  constructor(BaseUrl: string, TimeOut: number) {
    this.instance = axios.create({
      baseURL: BaseUrl,
      timeout: TimeOut,
      validateStatus: (status) => status >= 200 && status < 500,
      headers: {
        Authorization: localStorage.getItem('token') || '',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = localStorage.getItem('token') || ''
        // if (typeof config.data === 'string') {
        //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        // }
        if (typeof config.data === 'object') {
          config.headers['Content-Type'] = 'multipart/form-data'
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }
  request<T = any>(config: AxiosRequestConfig) {
    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: AxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: AxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: AxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: AxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
  put<T = any>(config: AxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
}

const baseURL = import.meta.env.VITE_BASE_URL
export default new ZQRequest(baseURL, 2000)
