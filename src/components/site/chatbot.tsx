
'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, CornerDownLeft, Loader2, MessageCircle, X } from 'lucide-react';
import { answerQuestion } from '@/ai/flows/portfolio-assistant';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export default function Chatbot() {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I'm LUCKY, your friendly portfolio assistant. Ask me anything!" }
    ]);
    const [input, setInput] = useState('');
    const [isPending, startTransition] = useTransition();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && scrollAreaRef.current) {
            setTimeout(() => {
                scrollAreaRef.current?.scrollTo({
                    top: scrollAreaRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            }, 100);
        }
    }, [messages, isOpen]);
    
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
                    description: 'Failed to get a response. Please try again.',
                });
                setMessages(prev => prev.slice(0, -1));
            }
        });
    };

    return (
        <>
            <Button 
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg z-50"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </Button>
            
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50">
                    <Card className="w-[350px] h-[500px] flex flex-col shadow-2xl">
                        <CardHeader className="flex-shrink-0">
                            <CardTitle>AI Assistant</CardTitle>
                            <CardDescription>Ask me anything about this portfolio.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                                <div className="space-y-4">
                                    {messages.map((message, index) => (
                                        <div key={index} className={`flex items-start gap-3 text-sm ${message.role === 'user' ? 'justify-end' : ''}`}>
                                            {message.role === 'assistant' && <div className="p-1.5 rounded-full bg-primary/10 text-primary flex-shrink-0"><Bot size={18} /></div>}
                                            <div className={`rounded-lg px-3 py-2 max-w-[85%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                <ReactMarkdown className="prose prose-sm prose-invert max-w-none leading-normal">{message.content}</ReactMarkdown>
                                            </div>
                                            {message.role === 'user' && <div className="p-1.5 rounded-full bg-muted flex-shrink-0"><User size={18} /></div>}
                                        </div>
                                    ))}
                                    {isPending && (
                                        <div className="flex items-start gap-3">
                                            <div className="p-1.5 rounded-full bg-primary/10 text-primary flex-shrink-0"><Bot size={18} /></div>
                                            <div className="rounded-lg p-3 bg-muted flex items-center">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                            <div className="p-4 border-t bg-background">
                                <form onSubmit={handleSubmit} className="relative">
                                    <Input
                                        value={input}
                                        onChange={handleInputChange}
                                        placeholder="Ask a question..."
                                        className="pr-10 h-10"
                                        disabled={isPending}
                                    />
                                    <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isPending || !input.trim()}>
                                        <CornerDownLeft size={16} />
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}
