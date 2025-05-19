export const env = {
  VAPI_PUBLIC_KEY: import.meta.env.VITE_VAPI_PUBLIC_KEY as string,
  VAPI_ASSISTANT_ID: import.meta.env.VITE_VAPI_ASSISTANT_ID as string
};

if (!env.VAPI_PUBLIC_KEY || !env.VAPI_ASSISTANT_ID) {
  throw new Error('Missing required VAPI environment variables');
}