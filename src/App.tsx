import { Outlet } from "react-router-dom";
import "./index.css";
import { Layout, message } from "antd";
import { HeaderFun } from "./components/header";
import { SiderFun } from "./components/sider";
import { useRequest } from "ahooks";
import { authLogin } from "./api/users";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const { Content, Footer } = Layout;

function App() {
  const navigate = useNavigate();

  const authLoginUseRequest = useRequest(authLogin, { manual: true });

  useEffect(() => {
    authLoginUseRequest
      .runAsync()
      .then((res: any) => {
        if (!res.code) {
          message.error("登录过期,请重新登录");
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err === 401) {
          message.error("登录过期,请重新登录");
          navigate("/login");
        }
      });
  }, []);

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
