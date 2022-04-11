import { FC } from "react";
import { Typography } from "antd";

interface BooksInfoProps {
  name?: string;
}

export const BooksInfo: FC<BooksInfoProps> = () => {
  return <Typography.Title>书籍信息</Typography.Title>;
};
