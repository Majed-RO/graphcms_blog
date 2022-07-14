// Resource: https://stackoverflow.com/questions/45194598/using-process-env-in-typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GRAPHCMS_ENDPOINT: string; // this is the line you want
      GRAPHCMS_TOKEN: string; // this is the line you want
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}
export {}
