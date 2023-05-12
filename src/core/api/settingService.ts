import { get, post } from "~/core/services/request";
import { HttpResponse, ISetting } from "~/interface";

const getSetting = (): Promise<HttpResponse<ISetting>> => {
  return get("/getSetting");
};

const setSetting = (
  params: ISetting
): Promise<HttpResponse<{ message: string; status: any }>> => {
  return post("/setSetting", params);
};

export { getSetting, setSetting };
