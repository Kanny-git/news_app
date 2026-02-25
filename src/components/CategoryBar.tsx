'use client';

import React from 'react';

interface CategoryBarProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const categories = [
    { id: 'general', label: '総合' },
    { id: 'technology', label: 'テクノロジー' },
    { id: 'business', label: 'ビジネス' },
    { id: 'science', label: '科学' },
    { id: 'entertainment', label: 'エンタメ' },
    { id: 'health', label: '健康' },
    { id: 'sports', label: 'スポーツ' },
];

export default function CategoryBar({ activeCategory, onCategoryChange }: CategoryBarProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 py-6 border-b border-gray-100 mb-8 sticky top-0 bg-white/80 backdrop-blur-md z-10">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105 active:scale-95'
                        }`}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
}
