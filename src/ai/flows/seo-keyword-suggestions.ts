// This file is machine-generated - edit with caution!
'use server';
/**
 * @fileOverview A flow to suggest SEO keywords based on portfolio content.
 *
 * - suggestSeoKeywords - A function that suggests SEO keywords.
 * - SeoKeywordsInput - The input type for the suggestSeoKeywords function.
 * - SeoKeywordsOutput - The return type for the suggestSeoKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SeoKeywordsInputSchema = z.object({
  portfolioContent: z
    .string()
    .describe('The content of the portfolio, including project descriptions, blog articles, and certificate information.'),
});
export type SeoKeywordsInput = z.infer<typeof SeoKeywordsInputSchema>;

const SeoKeywordsOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('An array of SEO keywords relevant to the portfolio content.'),
});
export type SeoKeywordsOutput = z.infer<typeof SeoKeywordsOutputSchema>;

export async function suggestSeoKeywords(input: SeoKeywordsInput): Promise<SeoKeywordsOutput> {
  return suggestSeoKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'seoKeywordsPrompt',
  input: {schema: SeoKeywordsInputSchema},
  output: {schema: SeoKeywordsOutputSchema},
  prompt: `You are an SEO expert. Given the following portfolio content, suggest a list of SEO keywords that would help improve search engine visibility.

Portfolio Content: {{{portfolioContent}}}

Keywords:`,
});

const suggestSeoKeywordsFlow = ai.defineFlow(
  {
    name: 'suggestSeoKeywordsFlow',
    inputSchema: SeoKeywordsInputSchema,
    outputSchema: SeoKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
