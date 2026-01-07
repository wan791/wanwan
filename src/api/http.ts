import axios, { AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useUserStore } from "../store/user";
import { layer } from '@layui/layui-vue';
import router from '../router'

type TAxiosOption = {
    timeout: number;
    baseURL: string;
}
 
// 优先从运行时环境变量读取（Cloudflare Worker 注入），否则使用构建时变量
const getApiUrl = () => {
  if (typeof window !== 'undefined' && (window as any).__ENV__?.VITE_API_URL) {
    return (window as any).__ENV__.VITE_API_URL;
  }
  return import.meta.env.VITE_API_URL || "https://apistock-1hgl.onrender.com";
};

const config: TAxiosOption = {
    timeout: 15000, // 增加到15秒
    baseURL: getApiUrl() + "/api"
}
 
class Http {
    service;
    constructor(config: TAxiosOption) {
        this.service = axios.create(config)

        /* 请求拦截 */
        this.service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            const userInfoStore = useUserStore();
            // 优先从运行时环境变量读取（Cloudflare Worker 注入），否则使用构建时变量
            const traderUUID = (typeof window !== 'undefined' && (window as any).__ENV__?.VITE_Web_Trader_UUID) 
              || import.meta.env.VITE_Web_Trader_UUID 
              || "default-trader-uuid";
            config.headers['Web-Trader-UUID'] = traderUUID;
            if (userInfoStore.token) {
                
              
                config.headers['session-token'] = userInfoStore.token as string
                
            } else {
                if(router.currentRoute.value.path.indexOf('system')>=0) {
                    router.push('/userlogin');
                }
            }
            return config
        }, error => {
            return Promise.reject(error);
        })

        /* 响应拦截 */
        this.service.interceptors.response.use((response: AxiosResponse<any>) => {
          
            // 检查响应是否包含success字段（后端标准格式）
            if ('success' in response.data) {
                // 如果是登录相关接口并且返回成功，直接返回完整响应数据
                if ((response.config.url?.includes('/login') || response.config.url?.includes('/adminlogin')) && response.data.success) {
                    return response.data;
                }
                
                return response.data;
            }
            // 处理传统的包含code字段的响应
            switch (response.data.code) {
                case 200:
                    return response.data;
                case 500:
                    return response.data;
                case 401:
                    return response.data;
                default:
                    return response.data;
            }
        }, error => {
            // 错误处理
            let message = ''
            if (error.response) {
                // 服务器返回错误状态码
                const status = error.response.status;
                message = error.response.data?.message || error.response.data?.msg || '请求失败';
                 const userInfoStore = useUserStore();
                if (status === 401) {
                layer.msg('Login and failure, please log in again!', { icon: 2 });
                userInfoStore.token=null
                userInfoStore.userInfo=null
                router.push('/userlogin');
                } else if (status === 403) {
                    
                    layer.msg('You do not have permission to perform this action', { icon: 2 });
                } else if (status === 404) {
                    layer.msg('The requested resource does not exist', { icon: 2 });
                } else if (status >= 500) {
                    //layer.msg('服务器内部错误', { icon: 2 });
                } else {
                   // layer.msg(message, { icon: 2 });
                }
            } else if (error.request) {
                // 请求发出但没有收到响应
                layer.msg('The network connection failed. Please check the network settings', { icon: 2 });
            } else {
                // 请求配置出错
                layer.msg('请求配置错误', { icon: 2 });
            }
            return {success:true,message:'The request was successful, but an error occurred and the request was not executed:'+message}
        })
    }

    /* GET 方法 */
    get<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.get(url, { params, ..._object })
    }
    /* POST 方法 */
    post<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.post(url, params, _object)
    }
    /* PUT 方法 */
    put<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.put(url, params, _object)
    }
    /* DELETE 方法 */
    delete<T>(url: string, params?: any, _object = {}): Promise<any> {
        return this.service.delete(url, { params, ..._object })
    }
}

export default new Http(config)