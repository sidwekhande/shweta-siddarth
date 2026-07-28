/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GAS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
