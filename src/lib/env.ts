// Environment variables utility
export const getEnv = (key: string, defaultValue: string = ''): string => {
  const value = import.meta.env[key];
  return value !== undefined ? value : defaultValue;
};

// Helper to check if environment variables are available
export const isElevenLabsConfigured = (): boolean => {
  return !!getEnv('VITE_ELEVENLABS_API_KEY');
};

// Get all environment variables with type safety
export const env = {
  ELEVENLABS_API_KEY: getEnv('VITE_ELEVENLABS_API_KEY'),
  SUPABASE_URL: getEnv('VITE_SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnv('VITE_SUPABASE_ANON_KEY'),
};