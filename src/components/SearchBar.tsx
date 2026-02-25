'use client';

import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-12">
            <div className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="キーワードでニュースを検索..."
                    className="w-full px-8 py-4 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-blue-50/50 outline-none transition-all duration-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 pr-24 text-lg"
                />
                <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="absolute right-3 top-2.5 bottom-2.5 px-6 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:scale-100 shadow-lg shadow-blue-100 flex items-center gap-2"
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                    <span>検索</span>
                </button>
            </div>
        </form>
    );
}
