import { Article } from '../types';
import { useFavorites } from '../context/FavoritesContext';

interface NewsCardProps {
    article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const active = isFavorite(article.url);

    return (
        <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-1 flex flex-col h-full relative">
            <div className="relative aspect-video overflow-hidden">
                {article.image ? (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">画像がありません</span>
                    </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                        {article.source.name}
                    </span>
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(article);
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${active
                        ? 'bg-red-500 text-white shadow-lg shadow-red-200 scale-110'
                        : 'bg-white/80 text-gray-400 hover:bg-white hover:text-red-500 hover:scale-110'
                        }`}
                >
                    <svg
                        className={`w-5 h-5 ${active ? 'fill-current' : 'fill-none'}`}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold leading-tight mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {article.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <time className="text-[11px] text-gray-400 font-medium">
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
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group/link"
                    >
                        もっと見る
                        <svg
                            className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    );
}
