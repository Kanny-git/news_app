'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFavorites } from '@/context/FavoritesContext';

export default function Navbar() {
    const pathname = usePathname();
    const { favorites } = useFavorites();

    const navItems = [
        { label: 'ニュース', href: '/' },
        { label: 'お気に入り', href: '/favorites', badge: favorites.length },
    ];

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-black text-gray-900 tracking-tighter hover:opacity-80 transition-opacity">
                    GNews <span className="text-blue-600">デイリー.</span>
                </Link>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-bold transition-colors relative ${pathname === item.href ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {item.label}
                                {item.badge !== undefined && item.badge > 0 && (
                                    <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
