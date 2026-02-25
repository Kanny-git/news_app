'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import NewsGrid from '@/components/NewsGrid';
import { useFavorites } from '@/context/FavoritesContext';
import Link from 'next/link';

export default function FavoritesPage() {
    const { favorites, clearFavorites } = useFavorites();

    return (
        <main className="min-h-screen bg-[#fcfcfd]">
            <Navbar />

            <header className="bg-white py-16">
                <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">
                            お気に入り<span className="text-blue-600">記事.</span>
                        </h1>
                        <p className="text-gray-500 text-lg font-medium">
                            保存した大切なニュースをいつでも読み返せます。
                        </p>
                    </div>

                    {favorites.length > 0 && (
                        <button
                            onClick={clearFavorites}
                            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
                        >
                            すべて削除
                        </button>
                    )}
                </div>
            </header>

            <div className="container mx-auto px-6 pb-20">
                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-4">保存された記事はありません</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                            気になるニュースのハートアイコンをクリックして、自分だけのニュースリストを作りましょう。
                        </p>
                        <Link
                            href="/"
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                        >
                            ニュースを探しに行く
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <span className="h-px flex-1 bg-gray-100" />
                            <span className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
                                {favorites.length} 件の記事
                            </span>
                            <span className="h-px flex-1 bg-gray-100" />
                        </div>
                        <NewsGrid articles={favorites} isLoading={false} />
                    </div>
                )}
            </div>

            <footer className="border-t border-gray-100 py-16 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-400 text-sm font-medium">
                        GNews デイリー. 2026
                    </p>
                </div>
            </footer>
        </main>
    );
}
