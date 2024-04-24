import { FaTh, FaRegChartBar, FaCommentAlt, FaTruckMoving } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

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
