import React, { ReactNode, useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import styles from "./style/index.module.styl";

const { Header, Sider, Content } = Layout;

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  const [collapsed, onCollapse] = useState(false);
  const headerProps = {
    collapsed,
    onCollapse,
    props,
  };

  return (
    <Layout
      style={{
        maxHeight: "100vh",
        minHeight: "100vh",
        backgroundColor: "#F1F2F6",
      }}
    >
      <Sider
        className={styles.mysider}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles.logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.sitelayout}>
        <Header className={styles.sitelayoutbackground}>
          <div className={styles.trigger}>
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => onCollapse(false)} />
            ) : (
              <MenuFoldOutlined onClick={() => onCollapse(true)} />
            )}
          </div>
        </Header>
        <Content className={styles.rightContent}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default Container;
