import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
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
