import { FC } from "react";
import { Modal, Form, Input, DatePicker, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import locale from "antd/lib/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";

interface ModalChangeProps {
  addBooksInfoUseRequest: any;
  isModalVisible: boolean;
  setIsModalVisible: any;
  getBooksInfoUseRequest: any;
  setBooksList: any;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

export const ModalChange: FC<ModalChangeProps> = ({
  isModalVisible,
  setIsModalVisible,
  addBooksInfoUseRequest,
  getBooksInfoUseRequest,
  setBooksList,
}) => {
  const [form] = useForm();

  const handleOk = () => {
    const option = form.getFieldsValue(true);
    if (
      !isNull({
        ...option,
        appTime: Date.parse(option.appTime ? option.appTime._d : ""),
      })
    ) {
      message.error("请将信息补充完整");
      return;
    }
    addBooksInfoUseRequest
      .runAsync({
        ...option,
        appTime: Date.parse(option.appTime ? option.appTime._d : ""),
      })
      .then((res: any) => {
        if (res.code) {
          message.success(res.msg);
          getBooksInfoUseRequest.runAsync().then((result: any) => {
            setBooksList(result.data);
            setIsModalVisible(false);
            form.resetFields();
          });
        } else {
          message.error(res.msg);
        }
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      title={"新增书籍"}
      okText="确认"
      cancelText="取消"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...layout} form={form} name="booksInfo">
        <Form.Item name="bookName" label="书名">
          <Input placeholder="请输入书名" />
        </Form.Item>
        <Form.Item name={"author"} label="作者">
          <Input placeholder="前输入作者" />
        </Form.Item>
        <Form.Item name={"press"} label="出版社">
          <Input placeholder="请输入出版社" />
        </Form.Item>
        <Form.Item name={"appTime"} label="出版时间">
          <DatePicker
            showTime
            showNow={false}
            locale={locale}
            style={{ width: "100%" }}
            placeholder="选择出版时间"
          />
        </Form.Item>
        <Form.Item name={"margin"} label="库存余量">
          <Input placeholder="请输入库存余量" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

function isNull(bookMap: {
  bookName: string;
  author: string;
  appTime: number;
  press: string;
  margin: number;
}) {
  if (
    !bookMap.bookName ||
    !bookMap.author ||
    !bookMap.appTime ||
    !bookMap.press ||
    !bookMap.margin
  )
    return false;
  return true;
}
