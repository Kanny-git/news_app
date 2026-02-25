'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article } from '@/types';

interface FavoritesContextType {
    favorites: Article[];
    toggleFavorite: (article: Article) => void;
    isFavorite: (url: string) => boolean;
    clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<Article[]>([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('news_app_favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const toggleFavorite = (article: Article) => {
        setFavorites((prev) => {
            const isAlreadyFavorite = prev.some((item) => item.url === article.url);
            let newFavorites;
            if (isAlreadyFavorite) {
                newFavorites = prev.filter((item) => item.url !== article.url);
            } else {
                newFavorites = [...prev, article];
            }
            localStorage.setItem('news_app_favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const isFavorite = (url: string) => {
        return favorites.some((item) => item.url === url);
    };

    const clearFavorites = () => {
        setFavorites([]);
        localStorage.removeItem('news_app_favorites');
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
