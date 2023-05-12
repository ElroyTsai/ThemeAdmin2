export interface IFile {
  folder: string[];
}

export interface EntryInfo {
  path: string;
  fullPath: string;
  basename: string;
  stats?: any;
  dirent?: any;
}

export interface MoveFolderParams {
  webSite: string;
  lastData: EntryInfo[];
}

export interface LastData {
  data: EntryInfo[];
  time: string;
  webSite: string;
}
