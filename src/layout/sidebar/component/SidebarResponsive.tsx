import {
  useDisclosure,
  Flex,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { IoMenuOutline } from "react-icons/io5";
import { renderTrack, renderThumb, renderView } from "~/components/scrollbar";
import Content from "./Content";

// FUNCTIONS
const SidebarResponsive = () => {
  const sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  const menuColor = useColorModeValue("gray.400", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex
        ref={btnRef as any}
        w="max-content"
        h="max-content"
        onClick={onOpen}
      >
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={"left"}
        finalFocusRef={btnRef as any}
      >
        <DrawerOverlay />
        <DrawerContent w="285px" maxW="285px" bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex="3"
            onClick={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default SidebarResponsive;
