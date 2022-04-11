import { Outlet } from "react-router-dom";
import "./index.css";
import { Layout } from "antd";
import { HeaderFun } from "./components/header";
import { SiderFun } from "./components/sider";

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderFun />
      <Layout className="site-layout">
        <HeaderFun />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>图书管理系统 ©2022 索大</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
