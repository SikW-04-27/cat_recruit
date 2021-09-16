// api接口管理
import { get, post } from './http'

const url1 = 'http://112.74.33.254:2358/';
// const url2 = 'http://112.74.33.254:2358/';

// const url1 = 'http://47.107.49.231/';
const url2 = 'http://47.107.49.231/';

//预约
//获取所有可预约时间
export const listAppointment = p => post(`${url1}appointment/listAll`, p);
//设置可预约时间
export const saveNewAppointmentInfo = p => post(`${url1}appointment/saveNewInfo`, p);
//用户预约时间段
export const updateUserInfo = p => post(`${url1}appointment/updateUserInfo`, p);
//用户取消预约
export const cancelAppointment = p => post(`${url1}appointment/cancelAppointment`, p);
//获得管理员是否开放预约
export const checkAppointment = () => post(`${url1}appointment/check`);
//查看用户是否能预约
export const isAppointed = () => post(`${url1}appointment/checkAppointment`);

//报名
//用户报名接口
export const submit = p => post(`${url2}enroll/submit`, p)
//通过用户id获取用户报名表
export const getSubmit = p => post(`${url2}enroll/get`, p)
// 通过ID删除预约时间
export const deleteAppointmentInfo = p => post(`${url1}appointment/deleteInfo`, p);
//获取所有学院
export const listAllCollege = p => get(`${url2}college/list`);
//获取指定学院下的专业
export const listMajor = p => post(`${url2}major/college`, p);
//获取全部专业
export const listAllMajor = () => get(`${url2}major/list`);
// 查询所有用户的报名信息
export const enrolllist = p => get(`${url2}enroll/list`, p);
//检测用户是否报名
export const checkEnroll = () => post(`${url1}`)



//通过ID获得某个用户的进度信息
export const getUserStatus = p => post(`${url1}status/getUserStatus`, p);
//新接口：获取用户阶段信息
export const getBriefInfo = () => post(`${url1}status/getBriefInfo`)
//获取所有的招新阶段
export const getAllStatus = () => post(`${url1}status/listAll`)
export const deleteAllAppointmentInfo = p => post(`${url1}appointment/delteAllInfo`, p);
//获取当前总体招新阶段
export const getCurrentStatus = p => post(`${url2}status/getCurrentStatus`, p);

//签到
//获取当前签到是否开启
export const queueStatus = () => post(`${url1}queue/checkStatus`);
//检查用户是否已经签到
export const checkUserStatus = p => post(`${url1}queue/checkUserStatus`)
//取消签到
export const cancelSignIn = () => post(`${url1}queue/cancel`)
//获得正在等待叫号的队列
export const listWaitingUser = () => post(`${url1}queue/listWaitingUser`)
//用户签到加入等待队列
export const queue = p => post(`${url1}queue/signIn`, p);



//切换下一阶段
export const updateStatus = p => post(`${url1}status/updateStatus`, p);

//调试接口：指定招新状态
export const updateStatusOnTest = p => post(`${url1}status/updateStatusOnTest`, p);


// 给邮箱发送验证码
export const sendCkeckNumber = p => post(`${url1}user/Verification`, p);

//回退上一阶段
export const toPreviousStatus = p => post(`${url1}status/toPreviousStatus`, p);

//查询所有用户分数
export const listAllUser = p => post(`${url1}status/listAllUser`, p);

//打分
export const addAppraise = p => post(`${url1}admin/addAppraise`, p);

// 学生或管理员注册
export const userRegister = p => post(`${url1}user/Regiest`, p);



//管理员开启签到状态
export const startQueue = p => post(`${url1}queue/startQueue`, p);

//管理员关闭签到状态
export const closeQueue = p => post(`${url1}queue/closeQueue`, p);

//检测管理员当前是否开启签到状态
export const checkStatus = p => post(`${url1}queue/checkStatus`, p);

// 用户登录
export const userLogin = p => post(`${url2}user/Login`, p);


// export const login111 = p => post11('/user/Login', p);
// export const login222 = p => post22('/major/list', p);
// export const login111 = p => instance11('/major/list', p);
// export const login222 = p => instance22('/user/Login', p);

export const getStudentNews = p => post(`${url2}message/list`);

export const getStudentInfo = p => get(`${url2}user/now`);
