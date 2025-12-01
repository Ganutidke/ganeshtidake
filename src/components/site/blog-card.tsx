"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { IBlog } from "@/models/blog.model";

interface BlogCardProps {
    blog: IBlog;
    index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
    return (
        <motion.div
            layout={true}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Card className="transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg flex flex-col h-full">
                <CardHeader className="p-0">
                    <Link href={`/blog/${blog.slug}`} className="block">
                        <div className="relative h-48 w-full overflow-hidden">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="h-full w-full"
                            >
                                <Image
                                    src={blog.coverImage.url}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>
                    </Link>
                </CardHeader>
                <CardContent className="p-6 pt-4 flex-grow flex flex-col">
                    <CardTitle className="font-headline text-xl mb-1 leading-tight">
                        <Link href={`/blog/${blog.slug}`} className="hover:text-primary transition-colors line-clamp-2">
                            {blog.title}
                        </Link>
                    </CardTitle>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="text-sm text-muted-foreground mb-3 mt-1"
                    >
                        {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="text-muted-foreground line-clamp-3 flex-grow"
                    >
                        {blog.excerpt}
                    </motion.p>
                    <Button asChild variant="link" className="mt-4 p-0 self-start">
                        <Link href={`/blog/${blog.slug}`}>
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}
