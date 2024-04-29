import { BiImageAdd } from "react-icons/bi";
import {
  FaCommentAlt,
  FaReceipt,
  FaRegChartBar,
  FaTh,
  FaTruckMoving,
  FaUsers,
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
    title: "Pedidos",
    icon: <FaReceipt />,
    path: "/orders",
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
