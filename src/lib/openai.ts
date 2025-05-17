import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export const generateResponse = async (userInput: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant representing QYGrowth. You help users understand our AI voice technology, pricing, and implementation details. Be professional, knowledgeable, and concise."
        },
        {
          role: "user",
          content: userInput
        }
      ],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 150
    });

    return completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "I apologize, but I'm having trouble connecting to my language processing system. Please try again in a moment.";
  }
};