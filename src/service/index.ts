import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
class ZQRequest {
  instance: AxiosInstance
  constructor(BaseUrl: string, TimeOut: number) {
    this.instance = axios.create({
      baseURL: BaseUrl,
      timeout: TimeOut,
      headers: {
        Authorization: localStorage.getItem('token') || ''
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (config.data) {
          config.headers['Content-Type'] = 'multipart/form-data'
        }
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
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
