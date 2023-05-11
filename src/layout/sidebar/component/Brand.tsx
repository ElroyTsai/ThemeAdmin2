// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { HorizonLogo } from "~/components/icons/Icons";
import { HSeparator } from "~/components/separator";

const SidebarBrand = () => {
  //   Chakra color mode
  const logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex alignItems="center" flexDirection="column">
      <Text h="26px" w="175px" my="32px" color={logoColor} fontSize={20}>
        Theme Admin
      </Text>
      <HSeparator mb="20px" />
    </Flex>
  );
};

export default SidebarBrand;
