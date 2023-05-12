import { UseToastOptions } from "@chakra-ui/react";
import { get, post } from "~/core/services/request";
import { HttpResponse } from "~/interface";
import { EntryInfo, IFile } from "~/interface/file";

const getAllFolder = (): Promise<HttpResponse<IFile>> => {
  return get("/getAllFolder");
};

const copyFolder = (params: {
  webSite: string;
}): Promise<HttpResponse<{ message: string; siteFile: EntryInfo[] }>> => {
  return post("/copyFolder", params);
};

const moveUpFolder = (params: {
  webSite: string;
  lastData: EntryInfo[];
}): Promise<HttpResponse<{ message: string; status: any }>> => {
  return post("/moveUpFolder", params);
};

const deleteFolder = (): Promise<
  HttpResponse<{ message: string; status: any }>
> => {
  return post("/deleteFolder");
};

export { getAllFolder, copyFolder, moveUpFolder, deleteFolder };
