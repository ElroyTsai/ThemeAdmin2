import { useState } from "react";
import { fileSystemService } from "~/core/api";
import swal from "~/plugins/simpleAlert";

const useFileSystem = () => {
  const [folders, setFolder] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllfolder = async () => {
    try {
      setLoading(true);
      const resp = await fileSystemService.getAllFolder();
      if (resp.statusCode !== 200) {
        const alert = await swal({
          icon: "error",
          text: resp?.error,
        });
        if (alert.isConfirmed) return;
      }
      setFolder(resp.result.folder);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyFolder = async (params: any) => {
    const resp = await fileSystemService.copyFolder(params);
    if (resp.statusCode !== 200) {
      await swal({
        icon: "error",
        text: resp?.error,
      });
      return;
    }
    await swal({
      icon: "success",
      text: resp.result.message,
    });
  };

  return { loading, folders, getAllfolder, copyFolder };
};

export default useFileSystem;
