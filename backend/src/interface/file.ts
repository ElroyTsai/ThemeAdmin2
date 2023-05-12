import readdir from "readdirp";

export interface IMoveeFolderParams {
  webSite: string;
  lastData?: readdir.EntryInfo[];
}
