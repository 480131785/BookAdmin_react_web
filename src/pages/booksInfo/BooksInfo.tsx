import { FC, useEffect, useState } from "react";
import { message, Table, Typography, Spin, Tag, Button } from "antd";
import { getBooksInfo, addBooksInfo } from "../../api/booksInfo";
import { useRequest } from "ahooks";
import { ModalChange } from "./components/ModalChange";
import { format } from "../../utils/format";

interface BooksInfoProps {}

interface BooksList {
  bookName: string;
  author: string;
  appTime: number;
  press: string;
  margin: number;
  hot: number;
}

export const BooksInfo: FC<BooksInfoProps> = () => {
  const [booksList, setBooksList] = useState<BooksList[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const getBooksInfoUseRequest = useRequest(getBooksInfo, { manual: true });
  const addBooksInfoUseRequest = useRequest(addBooksInfo, { manual: true });

  useEffect(() => {
    setLoading(true);
    getBooksInfoUseRequest.runAsync().then((res: any) => {
      if (res.code) {
        setBooksList(res.data);
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      title: "热度",
      key: "hot",
      dataIndex: "hot",
      render: (item: number) => {
        if (item > 30) {
          return <Tag color="magenta">{item}&nbsp;🔥</Tag>;
        }
        return <Tag color="orange">{item}</Tag>;
      },
    },
    {
      title: "书名",
      dataIndex: "bookName",
      key: "bookName",
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "出版社",
      dataIndex: "press",
      key: "press",
    },
    {
      title: "出版时间",
      dataIndex: "appTime",
      key: "appTime",
      render: (item: number) => {
        return <Tag color={"lime"}>{format(item)}</Tag>;
      },
    },
    {
      title: "库存余量",
      key: "margin",
      dataIndex: "margin",
      render: (item: number) => {
        if (item < 10) {
          return <Tag color="magenta">{item}</Tag>;
        }
        return <Tag color="cyan">{item}</Tag>;
      },
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      render: (item: string) => {
        return <a>借阅</a>;
      },
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <Spin spinning={loading}>
      <Typography.Title>书籍信息</Typography.Title>
      <Button type="primary" ghost onClick={showModal}>
        新增书籍
      </Button>
      <br />
      <br />
      <Table size="small" columns={columns} dataSource={booksList} />
      <ModalChange
        addBooksInfoUseRequest={addBooksInfoUseRequest}
        getBooksInfoUseRequest={getBooksInfoUseRequest}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setBooksList={setBooksList}
      />
    </Spin>
  );
};
