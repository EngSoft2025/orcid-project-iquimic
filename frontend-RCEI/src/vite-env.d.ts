interface ImportMetaEnv {
  VITE_ORCID_CLIENT_ID: string;
  VITE_ORCID_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}