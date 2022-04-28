import React, { FC } from "react";
import "./index.css";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { postRegister } from "../../api/users";
import { useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

interface RegisterProps {
  name?: string;
}

export const Register: FC<RegisterProps> = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const postRegisterUseRequest = useRequest(postRegister, { manual: true });

  const regChange = () => {
    const setPassword = form.getFieldValue("setpassword");
    const password = form.getFieldValue("password");
    const name = form.getFieldValue("username");
    if (!setPassword || !password || !name)
      return message.warning("账号密码不能为空");
    if (setPassword !== password) return message.error("两次密码不一致");
    if (JSON.stringify(setPassword).length < 8)
      return message.error("密码长度要大于八位");
    postRegisterUseRequest.runAsync({ name, password }).then((res: any) => {
      if (res.code) {
        message.success(res.msg + ",即将跳转登录页面");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        message.error(res.msg);
      }
    });
  };

  const checkLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login">
      <div className="block">
        <Form form={form} {...layout}>
          <Form.Item label="用户名" name="username" style={{ fontWeight: 900 }}>
            <Input style={{ borderRadius: 16 }} />
          </Form.Item>
          <Form.Item
            label="设置密码"
            name="setpassword"
            style={{ fontWeight: 900 }}
          >
            <Input.Password style={{ borderRadius: 16 }} />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="password"
            style={{ fontWeight: 900 }}
          >
            <Input.Password style={{ borderRadius: 16 }} />
          </Form.Item>
          <Form.Item
            name="loginBtn"
            label=" "
            colon={false}
            style={{ textAlignLast: "center" }}
          >
            <Button
              onClick={regChange}
              type="primary"
              style={{ width: "100%", borderRadius: 16 }}
            >
              注册
            </Button>
          </Form.Item>
          <Form.Item
            label=" "
            colon={false}
            name="regtn"
            style={{ textAlign: "center" }}
          >
            <span onClick={checkLogin} className="register">
              已有账号? 点击登录
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
