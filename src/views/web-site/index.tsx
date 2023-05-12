import { Box, Button, Card, CardBody, Select, Text } from "@chakra-ui/react";
import { map } from "lodash-es";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import useFileSystem from "~/hook/useFileSystem";
import SelectField from "~/components/fields/SelectField";
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
                <SelectField id="webSite" label="選擇站台">
                  <>
                    <Select
                      id="webSite"
                      h="44px"
                      maxH="44px"
                      placeholder="請選擇"
                      {...formik.getFieldProps("webSite")}
                    >
                      {map(folders, (e, i) => (
                        <option key={i} value={e}>
                          {e}
                        </option>
                      ))}
                    </Select>

                    {formik.touched.webSite && formik.errors.webSite && (
                      <Text color="red.500" mt={1}>
                        {formik.errors.webSite}
                      </Text>
                    )}
                  </>
                </SelectField>
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
