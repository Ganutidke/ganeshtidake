
'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, CornerDownLeft, Loader2, Send } from 'lucide-react';
import { answerQuestion } from '@/ai/flows/portfolio-assistant';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export default function ChatbotPageClient({ context }: { context: string }) {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isPending, startTransition] = useTransition();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || isPending) return;

        const userMessage: Message = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');

        startTransition(async () => {
            try {
                const result = await answerQuestion(input, newMessages);
                const assistantMessage: Message = { role: 'assistant', content: result.answer };
                setMessages((prev) => [...prev, assistantMessage]);
            } catch (error) {
                console.error('Error getting answer:', error);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to get a response from the chatbot.',
                });
                setMessages(prev => prev.slice(0, -1)); // Remove the user message on error
            }
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Chatbot Context</CardTitle>
                    <CardDescription>
                        The AI assistant uses this data, gathered from your entire portfolio, to answer questions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                        <pre className="text-xs whitespace-pre-wrap">{context}</pre>
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2 flex flex-col h-[620px]">
                <CardHeader>
                    <CardTitle>Test Chatbot</CardTitle>
                    <CardDescription>
                        Ask questions to test the AI assistant's knowledge.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                    <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                        <div className="space-y-6">
                            {messages.map((message, index) => (
                                <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                    {message.role === 'assistant' && <div className="p-2 rounded-full bg-primary/10 text-primary"><Bot size={20} /></div>}
                                    <div className={`rounded-lg p-3 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <ReactMarkdown className="prose prose-sm prose-invert max-w-none">{message.content}</ReactMarkdown>
                                    </div>
                                    {message.role === 'user' && <div className="p-2 rounded-full bg-muted"><User size={20} /></div>}
                                </div>
                            ))}
                            {isPending && (
                                 <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary"><Bot size={20} /></div>
                                    <div className="rounded-lg p-3 bg-muted flex items-center">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="p-4 border-t">
                        <form onSubmit={handleSubmit} className="relative">
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Ask about projects, skills, experience..."
                                className="pr-12 h-11"
                                disabled={isPending}
                            />
                            <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isPending}>
                                <Send size={18} />
                            </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
