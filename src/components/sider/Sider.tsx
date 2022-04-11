import { Layout, Typography, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navList } from "../nav";

const { Sider } = Layout;

export const SiderFun = () => {
  const [collapsed, setCollapsed] = useState<boolean>();
  const navigate = useNavigate();

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const routeChange = (value: { key: string }) => {
    navigate("/" + value.key);
  };
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      {!collapsed ? (
        <Typography.Title style={{ margin: 20, color: "#fff" }} level={3}>
          图书管理系统
        </Typography.Title>
      ) : (
        ""
      )}
      <Menu
        onClick={routeChange}
        theme="dark"
        defaultSelectedKeys={["books"]}
        mode="inline"
      >
        {navList?.map((item) => {
          return (
            <Menu.Item key={item.path} icon={item.icon}>
              {item.title}
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};
