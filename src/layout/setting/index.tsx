import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import InputField from "~/components/fields/InputField";
import useSetting from "~/hook/useSetting";
import { State } from "~/interface/state";

const SettingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const settings = useSelector((state: State) => state.rootReducer.setting);

  const { processing, setSetting } = useSetting();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>設定</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            localPath: {
              modifyPath: settings.localPath.modifyPath,
              sourcePathDisk: settings.localPath.sourcePathDisk,
              themePath: settings.localPath.themePath,
            },
          }}
          validationSchema={Yup.object().shape({
            localPath: Yup.object().shape({
              modifyPath: Yup.string().required("此欄未必填"),
              sourcePathDisk: Yup.string().required("此欄未必填"),
              themePath: Yup.string().required("此欄未必填"),
            }),
          })}
          onSubmit={(values) => {
            setSetting(values);
          }}
        >
          {(formik) => (
            <>
              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  <InputField
                    id="modifyPath"
                    type="text"
                    label="修改區路徑"
                    {...formik.getFieldProps("localPath.modifyPath")}
                  >
                    {formik.touched.localPath?.modifyPath &&
                      formik.errors.localPath?.modifyPath && (
                        <Text color="red.500" mt={1.5}>
                          {formik.errors.localPath?.modifyPath}
                        </Text>
                      )}
                  </InputField>
                  <InputField
                    id="sourcePathDisk"
                    type="text"
                    label="主線路徑"
                    {...formik.getFieldProps("localPath.sourcePathDisk")}
                  >
                    {formik.touched.localPath?.sourcePathDisk &&
                      formik.errors.localPath?.sourcePathDisk && (
                        <Text color="red.500" mt={1.5}>
                          {formik.errors.localPath?.sourcePathDisk}
                        </Text>
                      )}
                  </InputField>
                  <InputField
                    id="themePath"
                    type="text"
                    label="Theme路徑"
                    {...formik.getFieldProps("localPath.themePath")}
                  >
                    {formik.touched.localPath?.themePath &&
                      formik.errors.localPath?.themePath && (
                        <Text color="red.500" mt={1.5}>
                          {formik.errors.localPath?.themePath}
                        </Text>
                      )}
                  </InputField>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="submit"
                    variant="ghost"
                    mr={3}
                    isLoading={processing}
                    loadingText="處理中..."
                    isDisabled={!formik.isValid}
                  >
                    送出
                  </Button>
                  <Button colorScheme="blue" onClick={onClose}>
                    取消
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default SettingModal;
