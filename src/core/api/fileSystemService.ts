import { get, post } from "~/core/services/request";
import { HttpResponse } from "~/interface";
import { IFile } from "~/interface/file";

const getAllFolder = (): Promise<HttpResponse<IFile>> => {
  return get("/getAllFolder");
};

const copyFolder = (
  params: any
): Promise<HttpResponse<{ message: string }>> => {
  return post("/copyFolder", params);
};

export { getAllFolder, copyFolder };
