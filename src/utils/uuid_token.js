/*
 * @Author: scl
 * @Date: 2023-02-24 10:39:53
 * @LastEditTime: 2023-02-24 10:48:49
 * @Description: file content
 */
import { v4 as uuidv4 } from 'uuid';
// 生成一个随机字符串，且每次执行不能发生变化，游客身份持久化存储
export const getUUID = () => {
    //   先从本地存储获取uuid，判断本地是否拥有
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token;
}