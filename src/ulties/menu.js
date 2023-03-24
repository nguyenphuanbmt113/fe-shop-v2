import { BsCartCheck, BsMegaphone } from "react-icons/bs";
import icons from "./icons";
const {
  FaUserCircle,
  GrOrderedList,
  AiOutlineShoppingCart,
  MdOutlineCategory,
  FaUserLock,
} = icons;
export const sidebarMenu = [
  {
    id: 1,
    path: "product",
    text: "Sản phẩm",
    icon: <AiOutlineShoppingCart size="24px"></AiOutlineShoppingCart>,
  },
  {
    id: 2,
    path: "order",
    text: "Đã đặt hàng",
    icon: <GrOrderedList size="24"></GrOrderedList>,
  },
  {
    id: 3,
    path: "user",
    text: "Người dùng",
    icon: <FaUserCircle size="24"></FaUserCircle>,
  },
  {
    id: 4,
    path: "category",
    text: "Danh mục sản phẩm",
    icon: <MdOutlineCategory size="24"></MdOutlineCategory>,
  },
];
export const menuAccount = [
  {
    id: 1,
    text: "Thông Tin Tài Khoản",
    path: "info-user",
    icon: <FaUserLock size="24"></FaUserLock>,
  },
  {
    id: 2,
    text: "Liên Hệ",
    path: "contract",
    icon: <BsMegaphone size="24"></BsMegaphone>,
  },
  {
    id: 3,
    text: "Thông Tin Sản Phẩm",
    path: `order`,
    icon: <BsCartCheck size="24"></BsCartCheck>,
  },
];
