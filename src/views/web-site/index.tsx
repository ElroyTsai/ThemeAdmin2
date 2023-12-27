import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { map } from "lodash-es";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import useFileSystem from "~/hook/useFileSystem";
import { LastData } from "~/interface";
const WebSite = () => {
  const {
    processCopy,
    processMove,
    processDelete,
    folders,
    getAllfolder,
    copyFolder,
    moveUpFolder,
    deleteFolder,
  } = useFileSystem();

  useEffect(() => {
    getAllfolder();
  }, []);

  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={{
            webSite: "",
          }}
          validationSchema={Yup.object().shape({
            webSite: Yup.string().required("此欄未必填"),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(formik) => (
            <Box>
              <form>
                <FormControl mb={6}>
                  <FormLabel>選擇站台</FormLabel>
                  <AutoComplete openOnFocus>
                    <AutoCompleteInput
                      variant="outline"
                      style={{ color: "#000" }}
                    />
                    <AutoCompleteList>
                      {map(folders, (e, i) => (
                        <AutoCompleteItem
                          key={i}
                          value={e}
                          textTransform="capitalize"
                        >
                          {e}
                        </AutoCompleteItem>
                      ))}
                    </AutoCompleteList>
                  </AutoComplete>
                  {formik.touched.webSite && formik.errors.webSite && (
                    <Text color="red.500" mt={1}>
                      {formik.errors.webSite}
                    </Text>
                  )}
                </FormControl>
                <Box
                  display="grid"
                  gap="1rem"
                  gridAutoColumns="auto"
                  gridTemplateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(8, 1fr)",
                  }}
                >
                  <Button
                    colorScheme="blue"
                    isDisabled={!formik.isValid}
                    isLoading={processCopy}
                    loadingText="處理中..."
                    onClick={() => {
                      copyFolder(formik.values);
                    }}
                  >
                    複製站台
                  </Button>
                  <Button
                    colorScheme="green"
                    isDisabled={!formik.isValid}
                    isLoading={processMove}
                    loadingText="處理中..."
                    onClick={() => {
                      const copyFolder = localStorage.getItem(
                        "copyFolder"
                      ) as string;
                      const lastData = (JSON.parse(copyFolder) as LastData)
                        .data;
                      moveUpFolder({ ...formik.values, lastData });
                    }}
                  >
                    搬移站台
                  </Button>
                  <Button
                    colorScheme="red"
                    isLoading={processDelete}
                    loadingText="處理中..."
                    onClick={deleteFolder}
                  >
                    刪除站台
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default WebSite;
