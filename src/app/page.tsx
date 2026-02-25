'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CategoryBar from '@/components/CategoryBar';
import SearchBar from '@/components/SearchBar';
import NewsGrid from '@/components/NewsGrid';
import { Article } from '@/types';

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
    <main className="min-h-screen bg-[#fcfcfd]">
      <Navbar />

      {/* Hero Section */}
      <header className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">
            最新の情報を、<span className="text-blue-600">もっと身近に。</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto text-lg mb-10">
            世界中のトップニュースをリアルタイムでお届けします。
            キーワード検索やカテゴリ絞り込みで、興味のある話題をチェック。
          </p>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>

      <div className="container mx-auto px-6 pb-20">
        {!searchQuery && (
          <CategoryBar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-gray-900 divide-x-4 divide-blue-600">
            {searchQuery ? (
              <span>「{searchQuery}」の検索結果</span>
            ) : (
              <span>今日の話題</span>
            )}
          </h2>
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              検索をクリア
            </button>
          )}
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-3">ニュースの読み込み中にエラーが発生しました</h3>
            <p className="text-red-600/80 mb-8">{error}</p>
            <button
              onClick={() => searchQuery ? fetchNews('', searchQuery) : fetchNews(activeCategory)}
              className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-100"
            >
              再試行
            </button>
          </div>
        ) : (
          <NewsGrid articles={articles} isLoading={isLoading} />
        )}
      </div>

      <footer className="border-t border-gray-100 py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm font-medium">
            Powered by <a href="https://gnews.io" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GNews API</a>.
            Next.js & Tailwind CSS で構築。
          </p>
        </div>
      </footer>
    </main>
  );
}
