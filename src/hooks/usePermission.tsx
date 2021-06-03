/*
 * @Author: 鲁田文
 * @Date: 2021-06-02 15:44:15
 * @LastEditTime: 2021-06-03 15:15:26
 * @LastEditors: 鲁田文
 * @Description:
 */

import React, { useState, useEffect } from 'react'

import { RoutesOption } from "@/router/index";

export interface usePermissionProps {
  routers: RoutesOption[];
}

function usePermission({ routers }: usePermissionProps) {
  const [routerAuth, setRouterAuth] = useState<RoutesOption[] | []>([]);

  // 递归过滤没有权限路由
  const permission = (routers: RoutesOption[], auth: string): any => {
    return routers?.map(x => {
      if(x?.meta?.permissions && x?.meta?.permissions.some(y => y === auth) && x.children) {
        // 存在children
        return {
          ...x,
          permissions: permission(x.children, auth)
        }
      } else if(x?.meta?.permissions && x?.meta?.permissions.some(y => y === auth)) {
        return x
      }
    }).filter(z => z)// auth为当前用户角色 当前角色和路由permissions权限匹配 才有返回 否者过滤掉
  }

  useEffect(() => {
    const auth = 'admin';
    const newRouter = permission(routers, auth);
    setRouterAuth(newRouter);
    console.log(`newRouter`, newRouter)
    return () => { };
  }, []);
  return routerAuth;
}

export default usePermission;

