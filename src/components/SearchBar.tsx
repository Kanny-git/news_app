'use client';

import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

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
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-16">
            <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search className={`w-5 h-5 transition-colors ${query ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="最新のニュースをキーワードで検索..."
                    className="w-full pl-14 pr-28 py-5 bg-card border border-border rounded-3xl shadow-2xl shadow-primary/5 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 text-lg font-medium placeholder:text-muted-foreground/60"
                />
                <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="absolute right-3 top-2.5 bottom-2.5 px-6 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-accent active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:scale-100 shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Search className="w-4 h-4" />
                    )}
                    <span>検索</span>
                </button>
            </div>
        </form>
    );
}
