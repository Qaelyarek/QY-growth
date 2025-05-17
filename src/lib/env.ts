export const env = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  ELEVENLABS_API_KEY: import.meta.env.VITE_ELEVENLABS_API_KEY
};

export const isElevenLabsConfigured = () => {
  return !!env.ELEVENLABS_API_KEY && env.ELEVENLABS_API_KEY.length > 0;
};