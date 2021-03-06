//引入axios
import axios from 'axios';
// import { response } from 'express';
// 引入qs模块，用来序列化post类型的数据
// import qs from 'qs'
// import resolve from 'resolve';

// 环境的切换
if (process.env.NOOE_ENV == 'development') {
    axios.defaults.baseURL = '/api';
} else if (process.env.NOOE_ENV == 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NOOE_ENV == 'production') {
    axios.defaults.NOOE_ENV = '';
}

// 设置请求超时
axios.defaults.timeout = 10000;

axios.defaults.headers.get['Content-Type'] = 'application/json';

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截?????????????????????????????????????????????????????????????????????????????????????????????????????????

// 响应拦截?????????????????????????????????????????????????????????????????????????????????????????????????????????
axios.interceptors.response.use(
    response => {
        //添加token字段进请求头(加的是豪哥的token)
        let token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzA0MTk3OTIsInV1aWQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKbGVIQWlPakUyTXpBME1UazNPVElzSW5WMWFXUWlPaUp6VjJwRVEwNUJRU0o5LjVkb3lqWlNEbDlUYXE5UzdoSnROSDJFMWIzdkY1bkNRSFdUOGNtY01ubFkifQ.lo - F3baYaVItzdn5ZNzpocw114s8NDWpIcfbFfb1mOE
        if()
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        return Promise.reject(error.response);
    }
)

// 封装get方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            console.log("请求成功");
            resolve(res.data);
        }).catch(err => {
            console.log("请求失败");
            reject(err);
        })
    })
}

// 封装post请求
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                console.log("请求成功");
                resolve(res.data);
            }).catch(err => {
                console.log("请求失败");
                reject(err);
            })
    })
}

