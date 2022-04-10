import { Layout as Header, Avatar } from "antd";
import { useState } from "react";
import "./index.css";

export const HeaderFun = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const logOut = (event: any) => {
    setIsLogin(!isLogin);
    event.stopPropagation();
  };

  // 点击其他区域隐藏div
  document.onclick = function (event) {
    event = event || window.event;
    setIsLogin(false);
    event.stopPropagation();
  };

  return (
    <>
      <Header className="header-layout-background">
        <div className="user-title" id="lsy" onClick={logOut}>
          <Avatar size={40} src="https://joeschmoe.io/api/v1/random" />
          <span style={{ fontSize: 16, paddingLeft: 10 }}>LSY(管理员)</span>
        </div>
      </Header>
      {isLogin ? outList() : ""}
    </>
  );
};

function outList() {
  const outLogin = (event: any) => {
    event.stopPropagation();
  };
  return (
    <div className="out-list" onClick={outLogin}>
      退出登录
    </div>
  );
}
