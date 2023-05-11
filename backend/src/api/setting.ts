import fse from "fs-extra";
import path from "path";
import { ISetting } from "../interface/setting";
const file = path.join(process.cwd(), "/src/api", "_setting.json");

const init = async () => {
  await checkSetting();
};

const checkSetting = async () => {
  try {
    const exist = await fse.pathExists("./src/api/_setting.json");
    if (!exist)
      await fse.copy("./src/api/_template.json", "./src/api/_setting.json");
  } catch (error) {
    console.log(error);
  }
};

const getSetting = async (): Promise<ISetting> => {
  return JSON.parse(await fse.readFile(file, "utf8"));
};

const setSetting = async (params: any): Promise<void> => {
  return await fse.writeFile(file, JSON.stringify(params), "utf8");
};

init();

export { checkSetting, getSetting, setSetting };
