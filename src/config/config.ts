/*
 * @Author: 鲁田文
 * @Date: 2021-06-04 17:05:51
 * @LastEditTime: 2021-06-04 17:14:03
 * @LastEditors: 鲁田文
 * @Description: 公共请求配置 需要判断环境变量都写这里
 */
export const BASE_URL = process.env.NODE_ENV === 'development' ? '/div' : '';
