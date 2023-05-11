import { get } from "~/core/services/request";
import { HttpResponse } from "~/interface";
import { ISetting } from "~/interface/setting";

const getSetting = (): Promise<HttpResponse<ISetting>> => {
  return get("/getSetting");
};

export { getSetting };
