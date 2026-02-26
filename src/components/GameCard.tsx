import { Link } from 'react-router-dom';
import { Game, STORES } from '../data';
import { Heart, ExternalLink } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const store = STORES[game.storeId];

  return (
    <div className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20 flex flex-col h-full">
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80" />
        
        {/* Discount Badge */}
        {game.discount > 0 && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-md text-sm shadow-lg">
            -{game.discount}%
          </div>
        )}

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 bg-slate-900/60 backdrop-blur-sm rounded-full text-slate-300 hover:text-red-500 hover:bg-slate-900 transition-colors opacity-0 group-hover:opacity-100">
          <Heart className="w-4 h-4" />
        </button>

        {/* Store Icon */}
        <div className="absolute bottom-3 left-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border border-white/20 bg-white p-1.5"
            title={store?.name}
          >
            <img 
              src={store?.imageUrl} 
              alt={store?.name} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/game/${game.id}`} className="block flex-grow">
          <h3 className="text-lg font-bold text-white leading-tight mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {game.title}
          </h3>
          <div className="flex flex-wrap gap-1 mt-2">
            {game.platforms.slice(0, 3).map(p => (
              <span key={p} className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-sm">
                {p}
              </span>
            ))}
          </div>
        </Link>

        {/* Price & Action */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            {game.discount > 0 && (
              <span className="text-sm text-slate-500 line-through block leading-none mb-1">
                R$ {game.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-xl font-bold text-emerald-400 leading-none">
              R$ {game.currentPrice.toFixed(2).replace('.', ',')}
            </span>
          </div>
          
          <a
            href={game.prices.find(p => p.storeId === game.storeId)?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Ver Oferta
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
