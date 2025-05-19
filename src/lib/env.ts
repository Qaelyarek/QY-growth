interface EnvVariables {
  VAPI_PUBLIC_KEY: string;
  VAPI_ASSISTANT_ID: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

export const env: EnvVariables = {
  VAPI_PUBLIC_KEY: import.meta.env.VITE_VAPI_PUBLIC_KEY as string,
  VAPI_ASSISTANT_ID: import.meta.env.VITE_VAPI_ASSISTANT_ID as string,
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL as string,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY as string
};

// Validate required environment variables
export function validateEnv(): void {
  const missingVars = Object.entries(env)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}