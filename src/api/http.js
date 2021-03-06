import axios from 'axios';

axios.defaults.timeout = 5000; // 超时时间是5秒
axios.defaults.withCredentials = true; // 允许跨域
// Content-Type 响应头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 基础url
axios.defaults.baseURL = 'http://localhost:8888';

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status == 200) { //说明访问到接口
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401: //未登录
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath //记录当前地址
            }
          });
          break;
        case 404:
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

// 请求拦截器
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  const configSubstitute = config;
  const token = localStorage.getItem('token')
  const token2 = `Bearer ${token}`
  configSubstitute.headers.Authorization = token2
  return config;
},
  err => {
    return Promise.reject(err)
});

/**
 * 封装get方法
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => { //异步访问
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  });
}

/**
 * 封装post方法
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  });
}
