import {
  UnorderedListOutlined,
  UserAddOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";

interface NavList {
  path: string;
  title: string;
  icon: ReactNode;
}

export const navList: NavList[] = [
  {
    path: "books",
    title: "书籍信息",
    icon: <BookOutlined />,
  },
  {
    path: "borrow",
    title: "借阅记录",
    icon: <UnorderedListOutlined />,
  },
  {
    path: "user",
    title: "个人信息",
    icon: <UserAddOutlined />,
  },
];
