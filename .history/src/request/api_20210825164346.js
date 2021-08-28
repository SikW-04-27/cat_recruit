// api接口管理
import { get, post } from './http'

//获取所有可预约时间
export const listAppointment = p => post('http://112.74.33.254:2358/appointment/listAll', p);

//设置可预约时间
export const saveNewAppointmentInfo = p => post('http://112.74.33.254:2358/appointment/saveNewInfo', p);

//用户预约时间段
export const updateUserInfo = p => post('http://112.74.33.254:2358/appointment/updateUserInfo', p);

//用户取消预约
export const cancelAppointment = p => post('http://112.74.33.254:2358/appointment/cancelAppointment', p)

//用户报名接口
export const submit = p => post('http://112.74.33.254:2358/enroll/submit', p)

// 通过ID删除预约时间
export const deleteAppointmentInfo = p => post('http://112.74.33.254:2358/appointment/deleteInfo', p);

//通过ID获得某个用户的进度信息
export const getUserStatus = p => post('http://112.74.33.254:2358/status/getUserStatus', p)
export const deleteAllAppointmentInfo = p => post('http://112.74.33.254:2358/appointment/delteAllInfo', p);

//获取当前总体招新阶段
export const getCurrentStatus = p => post('http://112.74.33.254:2358/status/getCurrentStatus', p);

//切换下一阶段
export const updateStatus = p => post('http://112.74.33.254:2358/status/updateStatus', p);

//调试接口：指定招新状态
export const updateStatusOnTest = p => post('http://112.74.33.254:2358/status/updateStatusOnTest', p);

//获取所有学院
export const listAllCollege = p => get('http://47.107.49.231/cat/college/list')

//获取指定学院下的专业
export const listMajor = p => get('http://47.107.49.231/major/list', p)

//获取全部专业
export const listAllMajor = () => get('http://47.107.49.231/cat/major/list')

//提交报名表
export const submit 

// 给邮箱发送验证码
export const sendCkeckNumber = p => post('http://112.74.33.254:2358/user/Verification', p);

//回退上一阶段
export const toPreviousStatus = p => post('http://112.74.33.254:2358/status/toPreviousStatus', p);

//查询所有用户分数
export const listAllUser = p => post('http://112.74.33.254:2358/status/listAllUser', p);

//打分
export const addAppraise = p => post('http://112.74.33.254:2358/admin/addAppraise', p);

