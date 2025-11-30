"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Download, FileText, Loader2 } from "lucide-react";

interface ResumePreviewModalProps {
    resumeUrl: string;
}

export function ResumePreviewModal({ resumeUrl }: ResumePreviewModalProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Resume
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Resume Preview</span>
                        <Button asChild size="sm" className="gap-2">
                            <a href={resumeUrl} download target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4" />
                                Download PDF
                            </a>
                        </Button>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex-1 w-full h-full bg-muted/20 rounded-md overflow-hidden relative">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}
                    <iframe
                        src={`${resumeUrl}#toolbar=0`}
                        className="w-full h-full"
                        onLoad={() => setIsLoading(false)}
                        title="Resume Preview"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
