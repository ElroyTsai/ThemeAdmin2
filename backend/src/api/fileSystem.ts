import fse from "fs-extra";
import readdirp from "readdirp";
import path from "path";
import crypto from "crypto";
import compressing from "compressing";
import { setting } from ".";
import _ from "lodash";
import { IMoveeFolderParams } from "../interface/file";
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

// 比對 Modify 與 backup 檔案
const listModifyFilePath = (
  filePathArray: readdirp.EntryInfo[],
  sourcePath: any,
  backupPath: any
) => {
  // 篩選後檔案
  let resultFilePaths = [];
  // 篩選出有被改過的檔案
  resultFilePaths = _.filter(filePathArray, (value) => {
    const sourceFilePath = path.join(sourcePath, value.path);
    const backupFilePath = path.join(backupPath, value.path);

    // *取得hash值
    const getFileHash = (filePath: string) => {
      const buffer = fse.readFileSync(filePath);
      return crypto.createHash("sha1").update(buffer).digest("hex");
    };

    // *若備份檔不存在, 表示是新增檔案
    try {
      fse.statSync(backupFilePath);
      return getFileHash(sourceFilePath) !== getFileHash(backupFilePath);
    } catch (error) {
      console.log(error);
      return true;
    }
  });
  return resultFilePaths;
};

// 複製檔案到Dist
const copyFiles = (
  resultFilePathArray: readdirp.EntryInfo[],
  sourcePath: string,
  distPath: string
) => {
  return new Promise((resolve, reject) => {
    _.forEach(resultFilePathArray, (e, i) => {
      const resultFilePath = path.join(sourcePath, resultFilePathArray[i].path);
      const distFilePath = path.join(distPath, resultFilePathArray[i].path);
      fse.copySync(resultFilePath, distFilePath);
    });

    resolve(true);
  });
};

/**
 * *取得版控所有檔案
 **/
const getAllFolder = async (): Promise<string[]> => {
  const result: string[] = [];
  const folder = await fse.readdir(themePath);
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
  // *要複製的Theme版控路徑
  const themeTargetPath = path.join(themePath, webSite);

  const settings = {
    entryType: "files",
    directoryFilter: ["!.git", "!node_modules", "!dist", "!.github"],
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

const moveUpFolder = async ({
  webSite,
}: IMoveeFolderParams): Promise<{ message: string; status: string }> => {
  const removeFile = [];
  // *目標站名
  const targetSiteNo = webSite;
  // *要用VS開啟的資料夾
  const modifyPathDist = path.join(modifyPath, "difference");
  // *要複製的Theme版控路徑
  const themeTargetPath = path.join(themePath, targetSiteNo);
  // *主線路徑
  const sourcePath = path.join(sourcePathDisk);

  const settings = {
    root: modifyPath,
    entryType: "files",
    directoryFilter: ["!.git", "!node_modules", "!dist", "!.github"],
  };
  const rawFilePaths = await readdirp.promise(modifyPath, settings);
  const resultFilePaths = listModifyFilePath(
    rawFilePaths,
    modifyPath,
    sourcePath + ".Backup"
  );

  const checkDelFile = async (lastData: any) => {
    for (let i = 0; i < lastData.length; i++) {
      const modifyFile = path.join(modifyPath, lastData[i]);
      const tFSFile = path.join(themePath, webSite, lastData[i]);
      if (!fse.pathExistsSync(modifyFile)) {
        await fse.remove(tFSFile);
        removeFile.push(modifyFile);
      }
    }
  };

  // 自動刪版控檔案
  // if (lastData) {
  //   checkDelFile(lastData);
  // }

  //*複製DIST到版控;
  if (_.size(resultFilePaths) !== 0) {
    // console.log(123);
    await copyFiles(resultFilePaths, modifyPath, modifyPathDist);
    fse.copySync(modifyPathDist, themeTargetPath);
    fse.removeSync(path.join(themeTargetPath, "package-lock.json"));
    // 刪除DIST
    fse.removeSync(modifyPathDist);

    return {
      message: `${targetSiteNo} 已經轉移完成!!`,
      status: "success",
    };
  } else if (removeFile.length !== 0) {
    return {
      message: `${targetSiteNo} 已經轉移完成!!`,
      status: "success",
    };
  } else {
    return {
      message: `${targetSiteNo} 沒有修改!!`,
      status: "warning",
    };
  }
};

/**
 * *刪除檔案
 */
const deleteFolder = async (): Promise<{ message: string; status: string }> => {
  // *主線Portal路徑
  const sourcePath = path.join(sourcePathDisk);
  if (
    (await fse.exists(modifyPath)) ||
    (await fse.exists(`${sourcePath}.Backup`))
  ) {
    fse.remove(modifyPath);
    fse.remove(`${sourcePath}.Backup`);
  }

  return {
    message: "完成",
    status: "success",
  };
};

export { updateSetting, getAllFolder, copyFolder, moveUpFolder, deleteFolder };
