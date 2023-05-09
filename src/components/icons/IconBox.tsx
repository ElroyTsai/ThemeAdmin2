import { Flex } from "@chakra-ui/react";

const IconBox: React.FC<{ icon: JSX.Element | string }> = ({ icon }) => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"} borderRadius={"50%"}>
      {icon}
    </Flex>
  );
};

export default IconBox;
