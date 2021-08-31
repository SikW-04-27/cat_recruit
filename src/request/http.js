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

// post请求头的设置   请求头会变的
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截?????????????????????????????????????????????????????????????????????????????????????????????????????????

// 响应拦截?????????????????????????????????????????????????????????????????????????????????????????????????????????
axios.interceptors.response.use(
    response => {
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
            params:params
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



/*  

export function post11(url, params) {
axios.defaults.baseURL = 'http://112.74.33.254:2358';
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

export function post22(url, params) {
    axios.defaults.baseURL = 'http://47.107.49.231';
        return new Promise((resolve, reject) => {
            axios.get(url, params)
                .then(res => {
                    console.log("请求成功");
                    resolve(res.data);
                }).catch(err => {
                    console.log("请求失败");
                    reject(err);
                })
        })
    }

     const instance = axios.create({
        baseURL: 'http://47.107.49.231'
    })

    export function instance11(url, params) {
        return new Promise((resolve, reject) => {
            instance.get(url, params)
                .then(res => {
                    console.log("请求成功");
                    resolve(res.data);
                }).catch(err => {
                    console.log("请求失败");
                    reject(err);
                })
        })
    }

    const instance11 = axios.create({
        baseURL: 'http://112.74.33.254:2358'
    })

    export function instance22(url, params) {
        return new Promise((resolve, reject) => {
            instance11.post(url, params)
                .then(res => {
                    console.log("请求成功");
                    resolve(res.data);
                }).catch(err => {
                    console.log("请求失败");
                    reject(err);
                })
        })
    }

*/

