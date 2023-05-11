// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Navbar from "./navbar/NavbarAdmin";

import Sidebar from "./sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import Footer from "~/components/footer/FooterAdmin";
import { forEach, indexOf, startCase } from "lodash-es";
import { Routers } from "~/router/router";

const LayoutMain = () => {
  const [fixed] = useState(false);
  const { onOpen } = useDisclosure();
  const location = useLocation();

  const getActiveRoute = useMemo(() => {
    let activeRoute = "";
    forEach(Routers[0].children, (e, i) => {
      if (e.path === location.pathname) {
        activeRoute = e.name as string;
      }
    });
    return activeRoute;
  }, [location]);

  return (
    <Box>
      <Sidebar />
      <Box
        float="right"
        minHeight="100vh"
        height="100%"
        overflow="auto"
        position="relative"
        maxHeight="100%"
        w={{ base: "100%", xl: "calc( 100% - 290px )" }}
        maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
      >
        <Portal>
          <Box>
            <Navbar
              onOpen={onOpen}
              brandText={getActiveRoute}
              logoText={"Horizon UI Dashboard PRO"}
              fixed={fixed}
            />
          </Box>
        </Portal>
        <Box
          mx="auto"
          p={{ base: "130px 20px 20px 20px", md: "100px 30px 30px 30px" }}
          pe="20px"
          minH="100vh"
        >
          <Outlet />
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutMain;
