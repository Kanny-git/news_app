'use client';

import { Article } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { motion } from 'framer-motion';
import { Heart, ExternalLink, Clock } from 'lucide-react';

interface NewsCardProps {
    article: Article;
    index?: number;
}

export default function NewsCard({ article, index = 0 }: NewsCardProps) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const active = isFavorite(article.url);

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-card rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 flex flex-col h-full relative"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full group/image"
                >
                    {article.image ? (
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground text-sm font-medium">画像がありません</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm border border-white/20">
                            {article.source.name}
                        </span>
                    </div>
                </a>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(article);
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-20 ${active
                        ? 'bg-red-500 text-white shadow-lg shadow-red-200 scale-110'
                        : 'bg-white/80 dark:bg-black/80 text-gray-400 hover:bg-white dark:hover:bg-black hover:text-red-500 hover:scale-110 border border-white/20'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${active ? 'fill-current' : ''}`} />
                </button>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        5 min read
                    </span>
                </div>

                <h3 className="text-lg font-bold leading-tight mb-3 text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                    {article.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <time className="text-[11px] text-muted-foreground font-semibold">
                        {new Date(article.publishedAt).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-primary hover:text-accent inline-flex items-center gap-1.5 group/link"
                    >
                        続きを読む
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </motion.article>
    );
}
