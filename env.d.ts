// Generated by Wrangler
// by running `wrangler types --env-interface CloudflareEnv env.d.ts`

interface CloudflareEnv {
}

declare namespace NodeJS {
    interface ProcessEnv {
      ACCESS_KEY_ID: string;
      ACCESS_KEY_PASSWORD: string;
      JWT_SECRET: string;
    }
  }
