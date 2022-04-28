import { Layout as Header, Avatar, Upload, message, Spin } from "antd";
import { useState } from "react";
import ImgCrop from "antd-img-crop";
import "./index.css";
import { postPicture } from "../../api/users";
import { useRequest } from "ahooks";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const HeaderFun = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showPicture, setShowPicture] = useState<
    string | ArrayBuffer | null | undefined
  >(localStorage.userInfo ? JSON.parse(localStorage.userInfo).picture : "");

  const postPictureUseRequest = useRequest(postPicture, { manual: true });

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

  const upLoadPic = (option: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("files[]", option.file);
    const reader = new FileReader();
    reader.readAsDataURL(option.file);
    reader.onloadend = function (e) {
      if (localStorage.userInfo) {
        const data = {
          name: JSON.parse(localStorage.userInfo).name,
          picture: e?.target?.result,
          admin: JSON.parse(localStorage.userInfo).admin,
        };
        postPictureUseRequest.runAsync(data).then((res: any) => {
          if (res.code) {
            message.success(res.msg);
            localStorage.userInfo = JSON.stringify(data);
            setShowPicture(e?.target?.result);
            setLoading(false);
          }
        });
      }
    };
  };

  return (
    <Spin spinning={loading}>
      <Header className="header-layout-background">
        <div className="user-title">
          <ImgCrop
            modalTitle="裁剪头像"
            modalOk="上传"
            modalCancel="取消"
            shape="round"
            rotate
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={upLoadPic}
            >
              <Avatar
                size={40}
                src={
                  showPicture
                    ? showPicture
                    : "https://joeschmoe.io/api/v1/random"
                }
              />
            </Upload>
          </ImgCrop>
          <span onClick={logOut} style={{ fontSize: 16, paddingLeft: 10 }}>
            {localStorage.userInfo
              ? JSON.parse(localStorage.userInfo).name
              : ""}
            (
            {localStorage.userInfo
              ? JSON.parse(localStorage.userInfo).admin
                ? "管理员"
                : "用户"
              : ""}
            )
          </span>
        </div>
      </Header>
      {isLogin ? outList(navigate) : ""}
    </Spin>
  );
};

function outList(navigate: NavigateFunction) {
  const outLogin = (event: any) => {
    event.stopPropagation();
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    message.success("退出成功");
    navigate("/login");
  };
  return (
    <div className="out-list" onClick={outLogin}>
      退出登录
    </div>
  );
}
