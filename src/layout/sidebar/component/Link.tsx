// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { menus } from "~/models";
import { map } from "lodash-es";

const SidebarLink = () => {
  const location = useLocation();
  const activeColor = useColorModeValue("gray.700", "white");
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const activeIcon = useColorModeValue("brand.500", "white");
  const brandColor = useColorModeValue("brand.500", "brand.400");
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  // SIDEBAR
  return (
    <>
      {map(menus, (e, i) => (
        <NavLink key={i} to={e.link}>
          <Box>
            <HStack
              spacing={activeRoute(e.link.toLowerCase()) ? "22px" : "26px"}
              py="5px"
              ps="10px"
            >
              <Flex w="100%" alignItems="center" justifyContent="center">
                <Box
                  color={
                    activeRoute(e.link.toLowerCase()) ? activeIcon : textColor
                  }
                  me="18px"
                >
                  {e.icon}
                </Box>
                <Text
                  me="auto"
                  color={
                    activeRoute(e.link.toLowerCase()) ? activeColor : textColor
                  }
                  fontWeight={
                    activeRoute(e.link.toLowerCase()) ? "bold" : "normal"
                  }
                >
                  {e.text}
                </Text>
              </Flex>
              <Box
                h="36px"
                w="4px"
                bg={
                  activeRoute(e.link.toLowerCase()) ? brandColor : "transparent"
                }
                borderRadius="5px"
              />
            </HStack>
          </Box>
        </NavLink>
      ))}
    </>
  );
};

export default SidebarLink;
