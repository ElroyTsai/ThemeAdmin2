// Chakra imports
import {
  Flex,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components

const SelectField = (props: {
  id: string;
  label: string;
  extra?: JSX.Element;
  mb?: any;
  children: JSX.Element;
}) => {
  const { id, label, extra, mb, children, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  return (
    <Flex direction="column" mb={mb ? mb : "30px"}>
      <FormLabel
        display="flex"
        ms="10px"
        htmlFor={id}
        fontSize="sm"
        color={textColorPrimary}
        fontWeight="bold"
        _hover={{ cursor: "pointer" }}
      >
        {label}
        {extra && (
          <Text fontSize="sm" fontWeight="400" ms="2px">
            {extra}
          </Text>
        )}
      </FormLabel>
      {children}
    </Flex>
  );
};

export default SelectField;
