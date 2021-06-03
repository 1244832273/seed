/*
 * @Author: 鲁田文
 * @Date: 2021-04-08 14:22:35
 * @LastEditTime: 2021-06-02 16:42:10
 * @LastEditors: 鲁田文
 * @Description:
 */
import React from "react";
import { Layout, Menu } from "antd";
import { useHistory } from 'react-router-dom';
import { MenuInfo } from "rc-menu/lib/interface";
import { MenuOutlined } from "@ant-design/icons";

import routers from "@/router/routers";
import { RoutesOption } from "@/router/index";
import usePermission from "@/hooks/usePermission";
import styles from "../style/index.module.styl";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface MenuProps {
  collapsed: boolean;
}

function MyMenu({ collapsed }: MenuProps) {
  const history = useHistory();

  // 过滤菜单
  const newRouters = usePermission({ routers });

  // menu开关
  const handleClickSiderMenu = (info: MenuInfo) => {
    history.push(String(info.key));
  };

  // 递归出菜单
  const getAllMenu = (routers: RoutesOption[], fPath: string = '') => {
    return (
      routers?.map(x => (
        x.children ?
          <SubMenu key={x.path} title={fPath + x.title} icon={collapsed && <MenuOutlined />}>
            {
              getAllMenu(x.children, fPath)
            }
          </SubMenu>
          :
          <Menu.Item key={fPath + x.path} icon={collapsed && <MenuOutlined />}>{x.title}</Menu.Item>
      ))
    )
  }

  return (
    <Sider
      className={styles.mysider}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className={styles.logo} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["/auth/activity"]} onClick={handleClickSiderMenu}>
        {
          getAllMenu(newRouters)
        }
      </Menu>
    </Sider>
  );
}

export default MyMenu;
