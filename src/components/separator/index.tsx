import { Flex } from "@chakra-ui/react";

const HSeparator = (props: { [x: string]: any }) => {
  const { ...rest } = props;
  return <Flex h="1px" w="100%" bg="rgba(135, 140, 189, 0.3)" {...rest} />;
};

const VSeparator = (props: { [x: string]: any }) => {
  const { ...rest } = props;
  return <Flex w="1px" bg="rgba(135, 140, 189, 0.3)" {...rest} />;
};

export { HSeparator, VSeparator };
