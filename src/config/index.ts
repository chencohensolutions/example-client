import development from "./development.json";

export interface IConfig {
  baseURL: string;
}

const ENV = process.env.REACT_APP_ENVIRONMENT || "development";
const configAssoc: any = [];
configAssoc["development"] = development;

const config: IConfig = configAssoc[ENV];
export default config;
