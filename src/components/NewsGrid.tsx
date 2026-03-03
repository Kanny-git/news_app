'use client';

import React from 'react';
import { Article } from '../types';
import NewsCard from './NewsCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox } from 'lucide-react';

interface NewsGridProps {
    articles: Article[];
    isLoading: boolean;
}

const SkeletonCard = () => (
    <div className="bg-card rounded-2xl overflow-hidden border border-border flex flex-col h-full animate-pulse shadow-sm">
        <div className="aspect-[16/10] bg-muted" />
        <div className="p-6 space-y-4">
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="space-y-2">
                <div className="h-6 bg-muted rounded w-full" />
                <div className="h-6 bg-muted rounded w-2/3" />
            </div>
            <div className="space-y-2 pt-4">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-4/5" />
            </div>
        </div>
    </div>
);

export default function NewsGrid({ articles, isLoading }: NewsGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center glass rounded-3xl border border-dashed border-border/50"
            >
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Inbox className="w-12 h-12 text-muted-foreground/40" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">記事が見つかりませんでした</h3>
                <p className="text-muted-foreground max-w-xs leading-relaxed">
                    現在、このカテゴリのニュースは見つかりません。他のキーワードやカテゴリをお試しください。
                </p>
            </motion.div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
                {articles.map((article, index) => (
                    <NewsCard key={`${article.url}-${index}`} article={article} index={index} />
                ))}
            </AnimatePresence>
        </div>
    );
}
