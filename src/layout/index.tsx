import { map } from "lodash-es";
import { Routes, Route, useLocation } from "react-router-dom";
import { Routers } from "~/router/router";
import { Router } from "~/interface";
const Layout = () => {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      {map(Routers, (e: Router, i) => (
        <Route key={i} path={e.path} element={e.element}>
          {map(e.children, (c: Router, i) => (
            <Route key={i} path={c.path} element={c.element}></Route>
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default Layout;
