'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
        <div className="flex flex-wrap items-center justify-center gap-3 py-4">
            {categories.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isActive
                                ? 'text-white'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{category.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
