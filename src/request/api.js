// api接口管理
import { get, post } from './http'

//获取所有可预约时间
export const listAppointment = p => post('http://112.74.33.254:2358/appointment/listAll',p);

//设置可预约时间
export const saveNewAppointmentInfo = p => post('http://112.74.33.254:2358/appointment/saveNewInfo',p);

// 通过ID删除预约时间
export const deleteAppointmentInfo = p => post('http://112.74.33.254:2358/appointment/deleteInfo',p);

// 删除全部时间段
export const deleteAllAppointmentInfo = p => post('http://112.74.33.254:2358/appointment/delteAllInfo',p);

//获取当前总体招新阶段
export const getCurrentStatus = p => post('http://112.74.33.254:2358/status/getCurrentStatus',p);

//切换下一阶段
export const updateStatus = p => post('http://112.74.33.254:2358/status/updateStatus',p);

//调试接口：指定招新状态
export const updateStatusOnTest = p => post('http://112.74.33.254:2358/status/updateStatusOnTest',p);

//回退上一阶段
export const toPreviousStatus = p => post('http://112.74.33.254:2358/status/toPreviousStatus',p);

//查询所有用户分数
export const listAllUser = p => post('http://112.74.33.254:2358/status/listAllUser',p);

//打分
export const addAppraise = p => post('http://112.74.33.254:2358/admin/addAppraise',p);
