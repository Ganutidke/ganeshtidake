
'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, CornerDownLeft, Loader2, MessageCircle, X, Sparkles, Send, RefreshCw } from 'lucide-react';
import { answerQuestion } from '@/ai/flows/portfolio-assistant';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import remarkGfm from 'remark-gfm';

type Message = {
    role: 'user' | 'assistant';
    content: string;
    id: string;
};

const SUGGESTIONS = [
    "Summarize latest blog post",
    "What is highest qualification",
    "Latest projects",
    "Contact information"
];

export default function Chatbot() {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I'm Lucky, your personal AI assistant. What can I help you with today?", id: 'init' }
    ]);
    const [input, setInput] = useState('');
    const [isPending, startTransition] = useTransition();
    const [streamingContent, setStreamingContent] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingContent, isPending, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const simulateTypewriter = async (text: string) => {
        setIsTyping(true);
        setStreamingContent('');

        const chunkSize = 2; // Characters per tick
        const delay = 10; // ms per tick

        for (let i = 0; i < text.length; i += chunkSize) {
            const chunk = text.slice(i, i + chunkSize);
            setStreamingContent(prev => prev + chunk);
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'assistant', content: text, id: Date.now().toString() }]);
        setStreamingContent('');
    };

    const processSubmission = async (text: string) => {
        if (!text.trim() || isPending || isTyping) return;

        const userMessage: Message = { role: 'user', content: text, id: Date.now().toString() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        startTransition(async () => {
            try {
                const result = await answerQuestion(text, messages);
                await simulateTypewriter(result.answer);
            } catch (error) {
                console.error('Error getting answer:', error);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to get a response. Please try again.',
                });
                // Remove the user message if failed? Or just show error?
                // For now, just stop pending state
            }
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        processSubmission(input);
    };

    const handleSuggestionClick = (suggestion: string) => {
        processSubmission(suggestion);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="rounded-full shadow-lg h-14 px-6 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 flex items-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span className="font-semibold text-base">Ask AI</span>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] max-h-[80vh]"
                    >
                        <Card className="flex flex-col shadow-2xl border-border/50 bg-zinc-950 text-zinc-50 overflow-hidden h-[600px] max-h-[80vh]">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
                                <div>
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        Lucky AI <span className="text-xs font-normal text-zinc-400">1.1 version based on Gemini</span>
                                    </h3>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full h-8 w-8"
                                >
                                    <X size={20} />
                                </Button>
                            </div>

                            {/* Chat Area */}
                            <ScrollArea className="flex-1 bg-zinc-950 min-h-0">
                                <div className="space-y-6 p-4 pb-4 overscroll-contain">
                                    {messages.map((message) => (
                                        <div key={message.id} className={`flex flex-col gap-1 ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                                            <div className="flex items-center gap-2 text-xs text-zinc-400 px-1">
                                                {message.role === 'assistant' ? (
                                                    <>
                                                        <Bot size={14} /> <span>Lucky AI</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>User</span> <User size={14} />
                                                    </>
                                                )}
                                            </div>
                                            <div
                                                className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm leading-relaxed shadow-sm ${message.role === 'user'
                                                    ? 'bg-zinc-800 text-zinc-100 rounded-tr-sm'
                                                    : 'bg-zinc-100 text-zinc-900 rounded-tl-sm'
                                                    }`}
                                            >
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    className={`prose prose-sm max-w-none ${message.role === 'user' ? 'prose-invert' : ''} [&>table]:w-full [&>table]:overflow-x-auto [&>table]:block`}
                                                >
                                                    {message.content}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Streaming Message */}
                                    {isTyping && (
                                        <div className="flex flex-col gap-1 items-start">
                                            <div className="flex items-center gap-2 text-xs text-zinc-400 px-1">
                                                <Bot size={14} /> <span>Lucky AI</span>
                                            </div>
                                            <div className="rounded-2xl px-4 py-3 max-w-[85%] text-sm leading-relaxed shadow-sm bg-zinc-100 text-zinc-900 rounded-tl-sm">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    className="prose prose-sm max-w-none [&>table]:w-full [&>table]:overflow-x-auto [&>table]:block"
                                                >
                                                    {streamingContent}
                                                </ReactMarkdown>
                                                <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-zinc-400 animate-pulse" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Loading State */}
                                    {isPending && !isTyping && (
                                        <div className="flex flex-col gap-1 items-start">
                                            <div className="flex items-center gap-2 text-xs text-zinc-400 px-1">
                                                <Bot size={14} /> <span>Lucky AI</span>
                                            </div>
                                            <div className="rounded-2xl px-4 py-3 bg-zinc-100 text-zinc-900 rounded-tl-sm flex items-center gap-2">
                                                <RefreshCw className="h-4 w-4 animate-spin text-zinc-500" />
                                                <span className="text-zinc-500 text-xs font-medium">Thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={bottomRef} />
                                </div>
                            </ScrollArea>

                            {/* Suggestions */}
                            {!isTyping && !isPending && (
                                <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800 overflow-x-auto no-scrollbar">
                                    <div className="flex gap-2 w-max">
                                        {SUGGESTIONS.map((suggestion) => (
                                            <button
                                                key={suggestion}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors whitespace-nowrap border border-zinc-700"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input Area */}
                            <div className="p-4 bg-zinc-950 border-t border-zinc-800">
                                <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                                    <Input
                                        value={input}
                                        onChange={handleInputChange}
                                        placeholder="Type your message here..."
                                        className="flex-1 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-600 rounded-xl h-11 pr-10"
                                        disabled={isPending || isTyping}
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        className="absolute right-1.5 h-8 w-8 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded-lg"
                                        disabled={isPending || isTyping || !input.trim()}
                                    >
                                        <Send size={16} />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
