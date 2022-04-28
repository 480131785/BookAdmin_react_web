import React, { FC, useEffect } from "react";
import { useRequest } from "ahooks";
import "./index.css";
import { Button, Form, Input, message } from "antd";
import { postLogin, authLogin } from "../../api/users";
import { useForm } from "antd/lib/form/Form";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

interface LoginProps {
  name?: string;
}

export const Login: FC<LoginProps> = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const loginUseRequest = useRequest(postLogin, { manual: true });
  const authLoginUseRequest = useRequest(authLogin, { manual: true });

  useEffect(() => {
    authLoginUseRequest
      .runAsync()
      .then((res: any) => {
        if (res.code) {
          message.success(res.msg + ",自动跳转首页");
          setTimeout(() => {
            navigate("/books");
          }, 1000);
        }
      })
      .catch((err) => {
        if (err === 401) {
          message.error("登录过期,请重新登录");
          navigate("/login");
        }
      });
  }, []);

  const loginChange = () => {
    const name = form.getFieldValue("username");
    const password = form.getFieldValue("password");
    if (!name || !password) return message.warning("请输入账号密码");
    loginUseRequest.runAsync({ name, password }).then((res: any) => {
      if (res.code) {
        message.success(res.msg);
        localStorage.userInfo = JSON.stringify(res.data);
        localStorage.token = JSON.stringify(res.token);
        setTimeout(() => {
          navigate("/books");
        }, 1000);
      } else {
        message.error(res.msg);
      }
    });
  };

  const checkRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className="block">
        <Form form={form} {...layout}>
          <Form.Item label="用户名" name="username" style={{ fontWeight: 900 }}>
            <Input style={{ borderRadius: 16 }} />
          </Form.Item>
          <Form.Item label="密码" name="password" style={{ fontWeight: 900 }}>
            <Input.Password style={{ borderRadius: 16 }} />
          </Form.Item>
          <Form.Item
            name="loginBtn"
            label=" "
            colon={false}
            style={{ textAlignLast: "center" }}
          >
            <Button
              type="primary"
              onClick={loginChange}
              style={{ width: "100%", borderRadius: 16 }}
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item
            label=" "
            colon={false}
            name="regtn"
            style={{ textAlign: "center" }}
          >
            <span onClick={checkRegister} className="register">
              没有账号? 点击注册
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
