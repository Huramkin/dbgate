/// <reference types="vite/client" />

interface Window {
  dbgate_page: string;
  enableApiLog: () => void;
  disableApiLog: () => void;
  __loginToCloudTest: (email: string) => Promise<void>;
}

declare module 'dbgate-tools' {
  export function safeJsonParse(str: string, defaultValue: any, silent?: boolean): any;
  export function getConnectionLabel(connection: any, options?: any): string;
  export function serializeJsTypesReplacer(key: string, value: any): any;
  export const driverBase: any;
  export default any;
}

declare module 'dbgate-types' {
  export interface ExtensionsDirectory {
    drivers: any[];
    plugins: any[];
    fileFormats: any[];
    themes: any[];
    [key: string]: any;
  }
  export default any;
}

declare module 'dbgate-datalib' {
  export default any;
}

declare module 'dbgate-sqltree' {
  export default any;
}

declare module 'dbgate-query-splitter' {
  export default any;
}

declare module 'dbgate-rest' {
  export default any;
}
