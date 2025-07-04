
'use server';
/**
 * @fileOverview An AI assistant that answers questions about the portfolio.
 * - answerQuestion - A function that answers questions based on portfolio content.
 * - PortfolioAssistantInput - The input type for the answerQuestion function.
 * - PortfolioAssistantOutput - The return type for the answerQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

import { getAbout } from '@/lib/actions/about.actions';
import { getBlogs } from '@/lib/actions/blog.actions';
import { getCertificates } from '@/lib/actions/certificate.actions';
import { getEducationHistory } from '@/lib/actions/education.actions';
import { getExperienceHistory } from '@/lib/actions/experience.actions';
import { getFaqs } from '@/lib/actions/faq.actions';
import { getIntro } from '@/lib/actions/intro.actions';
import { getProjects } from '@/lib/actions/project.actions';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const PortfolioAssistantInputSchema = z.object({
  question: z.string().describe('The question the user is asking the assistant.'),
  portfolioContext: z.string().describe('The full content of the portfolio, stringified as JSON.'),
  history: z.array(MessageSchema).optional().describe('The history of the conversation.'),
});
export type PortfolioAssistantInput = z.infer<typeof PortfolioAssistantInputSchema>;

const PortfolioAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\'s question, generated by the AI.'),
});
export type PortfolioAssistantOutput = z.infer<typeof PortfolioAssistantOutputSchema>;

export async function answerQuestion(
  question: string,
  history: z.infer<typeof MessageSchema>[] = []
): Promise<PortfolioAssistantOutput> {
  const [
    intro,
    about,
    projects,
    blogs,
    experience,
    education,
    certificates,
    faqs,
  ] = await Promise.all([
    getIntro(),
    getAbout(),
    getProjects(),
    getBlogs(),
    getExperienceHistory(),
    getEducationHistory(),
    getCertificates(),
    getFaqs(),
  ]);

  const portfolioContext = JSON.stringify({
    intro,
    about,
    projects,
    blogs,
    experience,
    education,
    certificates,
    faqs,
  }, null, 2);

  return portfolioAssistantFlow({ question, portfolioContext, history });
}

const prompt = ai.definePrompt({
  name: 'portfolioAssistantPrompt',
  input: { schema: PortfolioAssistantInputSchema },
  output: { schema: PortfolioAssistantOutputSchema },
  prompt: `You are a helpful, enthusiastic, and friendly AI assistant for a personal portfolio. Your name is "LUCKY".

Your goal is to answer questions from visitors about the person's skills, experience, projects, and other information found in the portfolio. You should be encouraging and positive in your tone.

- Be conversational, professional, and cheerful.
- Use the provided portfolio context as your primary source of truth.
- Use the conversation history to understand follow-up questions and maintain context.
- If the answer is not in the context, politely state that you don't have information on that topic and suggest they ask something else. DO NOT make up information.
- Keep answers concise and to the point.
- Your persona is that of a knowledgeable and lucky guide for the portfolio.

Portfolio Context:
\`\`\`json
{{{portfolioContext}}}
\`\`\`

{{#if history}}
Conversation History:
{{#each history}}
{{this.role}}: {{this.content}}
{{/each}}
{{/if}}

User's Question: "{{{question}}}"

Answer:`,
});

const portfolioAssistantFlow = ai.defineFlow(
  {
    name: 'portfolioAssistantFlow',
    inputSchema: PortfolioAssistantInputSchema,
    outputSchema: PortfolioAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
