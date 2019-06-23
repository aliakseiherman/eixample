// @material-ui/icons
import Demo from "views/Demo/Demo.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Person from "@material-ui/icons/Person";

const dashboardRoutes = [
  {
    path: "/demo",
    name: "Demo",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Demo,
    layout: "/app",
    inSidebar: true
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/app",
    inSidebar: false
  },
];

export default dashboardRoutes;
