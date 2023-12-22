import { useToast } from "@chakra-ui/toast";
import { filter } from "lodash-es";
import { useState } from "react";
import { fileSystemService } from "~/core/api";
import { EntryInfo, MoveFolderParams } from "~/interface";

const useFileSystem = () => {
  const [folders, setFolder] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [processCopy, setProcessCopy] = useState<boolean>(false);
  const [processMove, setProcessMove] = useState<boolean>(false);
  const [processDelete, setProcessDelete] = useState<boolean>(false);
  const toast = useToast();

  const getAllfolder = async () => {
    try {
      setLoading(true);
      const resp = await fileSystemService.getAllFolder();
      const data = filter(resp.result.folder, (e) => e !== ".git");
      console.log(data);
      setFolder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyFolder = async (params: { webSite: string }) => {
    try {
      setProcessCopy(true);
      const resp = await fileSystemService.copyFolder(params);
      if (resp.statusCode !== 200) {
        toast({
          title: resp.error,
          status: "error",
          duration: 5000,
        });
        return;
      }
      localStorage.setItem(
        "copyFolder",
        JSON.stringify({
          webSite: params.webSite,
          data: resp.result.siteFile,
          time: new Date(),
        })
      );
      toast({
        title: resp.result.message,
        status: "success",
        duration: 5000,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setProcessCopy(false);
    }
  };

  const moveUpFolder = async (params: MoveFolderParams) => {
    try {
      setProcessMove(true);
      const resp = await fileSystemService.moveUpFolder(params);

      if (resp.statusCode !== 200) {
        toast({
          title: resp.error,
          status: "error",
          duration: 5000,
        });
        return;
      }

      toast({
        title: resp.result.message,
        duration: 5000,
        ...resp.result,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setProcessMove(false);
    }
  };

  const deleteFolder = async () => {
    try {
      setProcessDelete(true);
      const resp = await fileSystemService.deleteFolder();

      if (resp.statusCode !== 200) {
        toast({
          title: resp.error,
          status: "error",
          duration: 5000,
        });
        return;
      }

      toast({
        title: resp.result.message,
        duration: 5000,
        ...resp.result,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setProcessDelete(false);
    }
  };

  return {
    loading,
    processCopy,
    processMove,
    processDelete,
    folders,
    getAllfolder,
    copyFolder,
    moveUpFolder,
    deleteFolder,
  };
};

export default useFileSystem;
