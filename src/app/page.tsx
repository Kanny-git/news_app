'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CategoryBar from '@/components/CategoryBar';
import SearchBar from '@/components/SearchBar';
import NewsGrid from '@/components/NewsGrid';
import { Article } from '@/types';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCcw } from 'lucide-react';
import TrendingTicker from '@/components/TrendingTicker';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async (category: string, query?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = query
        ? `/api/news?q=${encodeURIComponent(query)}`
        : `/api/news?category=${category}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setArticles(data.articles || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      fetchNews(activeCategory);
    }
  }, [activeCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      fetchNews('', query);
    } else {
      fetchNews(activeCategory);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <TrendingTicker />

      {/* Hero Section */}
      <header className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-[2/1] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-primary/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            世界中の最新ニュースを、リアルタイムで
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-7xl font-black text-foreground mb-8 tracking-tighter leading-[1.1]"
          >
            最新の情報を、<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">もっと身近に。</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-xl mb-12 leading-relaxed"
          >
            GNews Daily は、世界中の膨大なニュースから、あなたにぴったりの情報を届ける次世代ニュースプラットフォームです。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-6 pb-24">
        {!searchQuery && (
          <div className="mb-12">
            <CategoryBar
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        )}

        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-primary rounded-full" />
            <h2 className="text-3xl font-black text-foreground tracking-tight">
              {searchQuery ? (
                <span>「{searchQuery}」の検索結果</span>
              ) : (
                <span>今日の注目トピック</span>
              )}
            </h2>
          </div>
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="text-sm font-bold text-primary hover:text-accent flex items-center gap-2 transition-colors px-4 py-2 rounded-full hover:bg-primary/10 border border-transparent hover:border-primary/20"
            >
              検索をクリア
            </button>
          )}
        </div>

        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass border border-red-200 dark:border-red-500/20 rounded-3xl p-16 text-center max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <RefreshCcw className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-400 mb-4">ニュースの取得に失敗しました</h3>
            <p className="text-red-600/80 dark:text-red-400/60 mb-10 text-lg leading-relaxed">{error}</p>
            <button
              onClick={() => searchQuery ? fetchNews('', searchQuery) : fetchNews(activeCategory)}
              className="px-10 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-200 dark:shadow-red-900/20 active:scale-95 flex items-center gap-2 mx-auto"
            >
              <RefreshCcw className="w-5 h-5" />
              もう一度読み込む
            </button>
          </motion.div>
        ) : (
          <NewsGrid articles={articles} isLoading={isLoading} />
        )}
      </div>

      <footer className="border-t border-border mt-12 py-16 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Newspaper className="w-6 h-6 text-primary" />
            <span className="text-xl font-black text-foreground tracking-tighter">
              GNews <span className="text-primary">Daily.</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm font-medium mb-4">
            世界中のトップヘッダーを、より美しく、よりシンプルに。
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-muted-foreground/60">
            <span>Powered by GNews API</span>
            <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
            <span>Built with Next.js & Framer Motion</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Add Newspaper Icon for footer
function Newspaper({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v4h4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h10" />
    </svg>
  );
}
