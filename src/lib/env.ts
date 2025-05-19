// Export environment variables with type safety
export const env = {
  VAPI_PUBLIC_KEY: import.meta.env.VITE_VAPI_PUBLIC_KEY as string,
  VAPI_ASSISTANT_ID: import.meta.env.VITE_VAPI_ASSISTANT_ID as string,
};