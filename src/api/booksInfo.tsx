import { http } from "../config/http";

interface BooksInfoProps {
  bookName: string;
  author: string;
  appTime?: number;
  press: string;
  margin?: number;
}

export function getBooksInfo() {
  return http({
    url: "/books/bookInfo",
    method: "get",
  });
}

export function addBooksInfo(option: BooksInfoProps) {
  return http({
    url: "/books/bookInfo",
    method: "post",
    data: option,
  });
}
