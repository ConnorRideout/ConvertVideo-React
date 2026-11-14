import { CodecInfo, ConfigData } from "../lib/types";

export { };

declare global {
  interface Window {
    pywebview?: {
      api: {
        // greet(name: string): Promise<string>;
        getTopPath(): Promise<string>;
        getCodecs(): Promise<CodecInfo[]>;
        getConfig(): Promise<ConfigData>
      };
    };
  }
}