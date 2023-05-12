import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { settingService } from "~/core/api";
import { getSetting } from "~/core/slices";
import store from "~/core/store";
import { ISetting } from "~/interface";

const useSetting = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const toast = useToast();

  const setSetting = async (params: ISetting) => {
    try {
      setProcessing(true);
      console.log(params);
      const resp = await settingService.setSetting(params);

      if (resp.statusCode !== 200) {
        toast({
          title: resp.error,
          status: "error",
          duration: 5000,
        });
        return;
      }
      store.dispatch(getSetting());
      toast({
        title: resp.result.message,
        duration: 5000,
        ...resp.result,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  return {
    processing,
    setSetting,
  };
};

export default useSetting;
