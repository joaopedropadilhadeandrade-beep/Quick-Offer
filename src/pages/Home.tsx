import { useState } from 'react';
import { MOCK_GAMES, STORES } from '../data';
import GameCard from '../components/GameCard';
import { motion } from 'motion/react';
import { ArrowRight, Flame, Tag, TrendingUp, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [activeStoreTab, setActiveStoreTab] = useState<string>('steam');
  
  const featuredGame = MOCK_GAMES[0];
  const flashSales = MOCK_GAMES.filter(g => g.discount >= 50).slice(0, 4);
  const trendingGames = MOCK_GAMES.slice(1, 5);
  
  const storeGames = MOCK_GAMES.filter(g => g.storeId === activeStoreTab).slice(0, 4);

  const genres = [
    'Ação', 'RPG', 'Aventura', 'Estratégia', 'Esportes', 'Terror', 
    'FPS', 'Indie', 'Sobrevivência', 'Metroidvania', 'Simulação', 'Mundo Aberto'
  ];

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={featuredGame.coverImage} 
            alt={featuredGame.title} 
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-6 border border-blue-500/30">
              <Flame className="w-4 h-4" />
              Oferta do Dia
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-4">
              {featuredGame.title}
            </h1>
            <p className="text-lg text-slate-300 mb-8 line-clamp-2 max-w-xl">
              {featuredGame.description}
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-lg">
                  -{featuredGame.discount}%
                </span>
                <div className="flex flex-col">
                  <span className="text-slate-400 line-through text-sm">
                    R$ {featuredGame.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-3xl font-bold text-white leading-none">
                    R$ {featuredGame.currentPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
              
              <Link 
                to={`/game/${featuredGame.id}`}
                className="bg-white text-slate-950 hover:bg-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center gap-2"
              >
                Ver Detalhes
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Store Tabs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Store className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Ofertas por Loja</h2>
          </div>
          <Link to={`/search?store=${activeStoreTab}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1">
            Ver todas da loja <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-4 mb-6 gap-3 scrollbar-hide">
          {Object.values(STORES).map((store) => (
            <button
              key={store.id}
              onClick={() => setActiveStoreTab(store.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all whitespace-nowrap flex-shrink-0 ${
                activeStoreTab === store.id 
                  ? 'bg-slate-800 border-slate-600 shadow-lg' 
                  : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm bg-white p-1.5">
                <img 
                  src={store.imageUrl} 
                  alt={store.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className={`font-medium ${activeStoreTab === store.id ? 'text-white' : 'text-slate-400'}`}>
                {store.name}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {storeGames.length > 0 ? (
            storeGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GameCard game={game} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
              <p className="text-slate-400">Nenhuma oferta em destaque para esta loja no momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* Flash Sales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500">
              <Flame className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Promoções Relâmpago</h2>
          </div>
          <Link to="/search?discount=50" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1">
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSales.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Em Alta</h2>
          </div>
          <Link to="/search?sort=trending" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1">
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Tag className="w-6 h-6 text-emerald-400" />
          Navegar por Gênero
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <Link 
              key={genre}
              to={`/search?genre=${genre.toLowerCase()}`}
              className="bg-slate-900 border border-slate-800 hover:border-slate-600 hover:bg-slate-800 rounded-xl p-4 text-center transition-all group"
            >
              <span className="font-medium text-slate-300 group-hover:text-white">{genre}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
