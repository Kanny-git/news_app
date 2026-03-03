'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const trendingItems = [
    "AI技術の進化が加速",
    "世界経済の展望と課題",
    "次世代エネルギーへの転換",
    "最新のガジェット情報",
    "スポーツ界の歴史的快挙",
    "環境保護への新たな取り組み"
];

export default function TrendingTicker() {
    return (
        <div className="bg-primary/5 border-y border-primary/10 py-3 overflow-hidden whitespace-nowrap relative">
            <div className="container mx-auto px-6 h-full flex items-center gap-6">
                <div className="flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10 shadow-lg shadow-primary/20">
                    <TrendingUp className="w-3 h-3" />
                    <span>Trending Now</span>
                </div>

                <div className="flex items-center flex-1 overflow-hidden">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="flex items-center gap-12"
                    >
                        {[...trendingItems, ...trendingItems].map((item, i) => (
                            <span key={i} className="text-sm font-bold text-muted-foreground flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                                {item}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        </div>
    );
}
