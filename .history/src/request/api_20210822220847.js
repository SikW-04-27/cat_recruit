// api接口管理
import { get, post } from './http'

//获取所有可预约时间
export const listAppointment = p => post('http://112.74.33.254:2358/appointment/listAll',p);

//设置可预约时间
export const saveNewAppointmentInfo = p => post('http://112.74.33.254:2358/saveNewAppointmentInfo',p);

// 通过ID删除预约时间
export const deleteAppointmentInfo = p => post('http://112.74.33.254:2358/deleteAppointmentInfo',p);

// 删除全部时间段
export const deleteAllAppointmentInfo = p => post('http://112.74.33.254:2358/deleteAllAppointmentInfo',p);

//获取当前总体招新状态
