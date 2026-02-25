import React from 'react';
import { Article } from '../types';
import NewsCard from './NewsCard';

interface NewsGridProps {
    articles: Article[];
    isLoading: boolean;
}

export default function NewsGrid({ articles, isLoading }: NewsGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-[450px] animate-pulse">
                        <div className="aspect-video bg-gray-200" />
                        <div className="p-6 space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-3/4" />
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded" />
                                <div className="h-4 bg-gray-200 rounded w-5/6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Articles Found</h3>
                <p className="text-gray-500 max-w-xs">We couldn't find any news in this category. Try switching to a different one.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
        </div>
    );
}
