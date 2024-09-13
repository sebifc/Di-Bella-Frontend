import { BiImageAdd } from "react-icons/bi";
import {
  FaCommentAlt,
  FaReceipt,
  FaRegChartBar,
  FaTh,
  FaTruckMoving,
  FaUsers,
  FaList,
} from "react-icons/fa";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Agregar Producto",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Proveedores",
    icon: <FaTruckMoving />,
    path: "/suppliers",
  },
  {
    title: "Clientes",
    icon: <FaUsers />,
    path: "/clients",
  },
  {
    title: "Compras",
    icon: <FaReceipt />,
    path: "/orders",
  },
  {
    title: "Items",
    icon: <FaList />,
    path: "/items",
  },
  {
    title: "Cuenta",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Reportar Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
