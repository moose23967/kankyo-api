declare module 'bun' {
  export interface Env {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    DATABASE_URL: string;
    // biome-ignore lint/style/useNamingConvention: <explanation>
    JWT_SECRET: string;
    // biome-ignore lint/style/useNamingConvention: <explanation>
    PORT: number | undefined;
  }
}
