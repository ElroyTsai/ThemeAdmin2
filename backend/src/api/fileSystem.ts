﻿import fse from "fs-extra";
import readdirp from "readdirp";
import path from "path";
import replace from "replace-in-file";
import compressing from "compressing";
import { setting } from ".";
import _ from "lodash";
// !要用VS開啟的資料夾
let modifyPath = "";
// !主線Publish出來的槽位
let sourcePathDisk = "";
// !版控Theme路徑
let themePath = "";

// *初始化
init();

async function getConfig() {
  try {
    const json = '{"value":null}';
    const data = JSON.parse(json);
    const resp = await setting.getSetting();
    modifyPath = resp.localPath.modifyPath;
    sourcePathDisk = resp.localPath.sourcePathDisk;
    themePath = resp.localPath.themePath;
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  await setting.checkSetting();
  await getConfig();
}

/**
 * *外部觸發更新資料
 */
const updateSetting = async () => {
  await setting.checkSetting();
  await getConfig();
};

/**
 * *取得版控所有檔案
 **/
const getAllFolder = async (): Promise<string[]> => {
  const result: string[] = [];
  const folder = await fse.readdir("C:/Users/user/Project/theme");
  _.filter(folder, (folderName) => folderName !== undefined).forEach(
    (folderName) => result.push(folderName.substr(0, 8))
  );
  return result;
};

/**
 * *複製版控檔案
 **/

const copyFolder = async (webSite: string): Promise<{ message: string }> => {
  // *主線路徑
  const sourcePath = path.join(sourcePathDisk);
  // 要複製的Theme版控路徑
  const themeTargetPath = path.join(themePath, webSite);

  const settings = {
    entryType: "files",
    directoryFilter: [
      "!package-lock.json",
      "!node_modules",
      "!.git",
      "!dist",
      "!.github",
      "!.vscode",
      "!README",
      "!.gitignore",
    ],
  };

  try {
    /**
     * !檢查是否存在
     * !有的話就先刪除
     */
    if (fse.existsSync(modifyPath) || fse.existsSync(`${sourcePath}.Backup`)) {
      fse.removeSync(modifyPath);
      fse.removeSync(`${sourcePath}.Backup`);
    }

    const sourceFiles = await readdirp.promise(sourcePath, settings);
    // *複製主線到修改區
    _.forEach(sourceFiles, (e, i) => {
      fse.copySync(e.fullPath, `${modifyPath}/${e.path}`);
    });

    // *Theme to Modify
    fse.copySync(themeTargetPath, modifyPath);

    // *複製一份BACKUP
    fse.copySync(modifyPath, `${sourcePath}.Backup`);
  } catch (error) {
    console.log(error);
  }
  return {
    message: `${webSite} 複製完成!!`,
  };
};

export { updateSetting, getAllFolder, copyFolder };
