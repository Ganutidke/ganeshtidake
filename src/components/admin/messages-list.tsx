'use client';

import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Mail, MailOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { markMessageAsRead } from '@/lib/actions/message.actions';
import type { IMessage } from '@/models/message.model';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function MessagesList({ messages: initialMessages }: { messages: IMessage[] }) {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);
  
  const handleOpenChange = (open: boolean, messageId: string, isRead: boolean) => {
    if (open && !isRead) {
      markMessageAsRead(messageId);
      setMessages(prev => prev.map(msg => msg._id === messageId ? { ...msg, read: true } : msg));
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>From</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="hidden md:table-cell">Received</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <Dialog key={message._id as string} onOpenChange={(open) => handleOpenChange(open, message._id, message.read)}>
              <DialogTrigger asChild>
                <TableRow className={cn('cursor-pointer', !message.read && 'font-bold bg-primary/5')}>
                  <TableCell className="text-center">
                    {message.read ? <MailOpen className="h-5 w-5 text-muted-foreground" /> : <Mail className="h-5 w-5 text-primary" />}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{message.name}</span>
                      <span className={cn('text-sm', message.read ? 'text-muted-foreground font-normal' : 'text-foreground')}>
                        {message.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{message.subject}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>{message.subject}</DialogTitle>
                  <DialogDescription>
                    From: {message.name} ({message.email})
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 whitespace-pre-wrap text-sm">
                  {message.message}
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  Received on {format(new Date(message.createdAt), 'PPP p')}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </TableBody>
      </Table>
       {messages.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            You have no messages.
          </div>
        )}
    </div>
  );
}
