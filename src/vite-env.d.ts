/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV_NAME: string
  readonly VITE_APP_PROJECT_NAME: string
  readonly VITE_APP_DEBUG_SCREEN: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
