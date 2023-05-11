import { fileSystemService } from "~/core/api";

const useFileSystem = () => {
  const getAllfolder = async () => {
    const resp = await fileSystemService.getAllFolder();
    console.log(resp);
  };

  const copyFolder = async (params: any) => {
    const resp = await fileSystemService.copyFolder(params);
    console.log(resp);
  };

  return { getAllfolder, copyFolder };
};

export default useFileSystem;
