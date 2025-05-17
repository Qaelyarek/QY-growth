# QYGrowth AI Voice Agent Testing

A React application showcasing QYGrowth's AI Voice Agent technology for inbound & outbound calls, SMS, and chat.

## Features

- AI Voice Assistant with ElevenLabs integration
- Interactive voice conversations
- Calendar integration
- Consultation booking
- Responsive design

## Local Development

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in the values:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```
# Supabase configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# ElevenLabs API key for voice synthesis (optional)
VITE_ELEVENLABS_API_KEY=your-elevenlabs-api-key
```

## Deployment

This application is set up for easy deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Set the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add the environment variables in Netlify's UI

## Voice Technology

The application uses:
- ElevenLabs for premium voice synthesis
- Web Speech API as fallback for speech recognition and synthesis