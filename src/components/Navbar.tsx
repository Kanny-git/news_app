'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFavorites } from '@/context/FavoritesContext';
import { motion } from 'framer-motion';
import { Newspaper, Heart } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();
    const { favorites } = useFavorites();

    const navItems = [
        { label: 'ニュース', href: '/', icon: Newspaper },
        { label: 'お気に入り', href: '/favorites', icon: Heart, badge: favorites.length },
    ];

    return (
        <nav className="glass sticky top-0 z-50 border-b border-white/20">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                        <Newspaper className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black text-foreground tracking-tighter">
                        GNews <span className="text-primary">Daily.</span>
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-full ${isActive
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                                    {item.label}
                                    {item.badge !== undefined && item.badge > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold rounded-full border-2 ${isActive ? 'bg-white text-primary border-primary' : 'bg-primary text-white border-white'
                                                }`}
                                        >
                                            {item.badge}
                                        </motion.span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
