/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DUMMY_DATA: boolean;
  readonly VITE_SOCKET_URL: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

