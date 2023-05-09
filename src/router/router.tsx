import { Router } from "~/interface";
import LayoutMain from "~/layout/main";
import WebSite from "~/views/web-site";

export const Routers: Array<Router> = [
  {
    path: "",
    element: <LayoutMain />,
    children: [
      {
        path: "/web-site",
        element: <WebSite />,
      },
    ],
  },
];
