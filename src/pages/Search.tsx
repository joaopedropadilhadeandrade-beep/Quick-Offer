import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_GAMES, STORES } from '../data';
import GameCard from '../components/GameCard';
import { Filter, SlidersHorizontal, X, Search as SearchIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(300);

  const filteredGames = useMemo(() => {
    return MOCK_GAMES.filter(game => {
      const matchesQuery = game.title.toLowerCase().includes(query.toLowerCase()) || 
                           game.genres.some(g => g.toLowerCase().includes(query.toLowerCase()));
      const matchesPlatform = selectedPlatform ? game.platforms.includes(selectedPlatform) : true;
      const matchesGenre = selectedGenre ? game.genres.includes(selectedGenre) : true;
      const matchesStore = selectedStore ? game.storeId === selectedStore : true;
      const matchesPrice = game.currentPrice <= maxPrice;

      return matchesQuery && matchesPlatform && matchesGenre && matchesStore && matchesPrice;
    });
  }, [query, selectedPlatform, selectedGenre, selectedStore, maxPrice]);

  const platforms = Array.from(new Set(MOCK_GAMES.flatMap(g => g.platforms)));
  const genres = Array.from(new Set(MOCK_GAMES.flatMap(g => g.genres)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {query ? `Resultados para "${query}"` : 'Todos os Jogos'}
          </h1>
          <p className="text-slate-400">
            Encontramos {filteredGames.length} {filteredGames.length === 1 ? 'jogo' : 'jogos'}
          </p>
        </div>

        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg font-medium"
        >
          <Filter className="w-4 h-4" />
          Filtros
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className={`w-full md:w-64 flex-shrink-0 space-y-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filtros
              </h2>
              {showFilters && (
                <button onClick={() => setShowFilters(false)} className="md:hidden text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Preço Máximo: R$ {maxPrice}
              </label>
              <input 
                type="range" 
                min="0" 
                max="350" 
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Platform Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">Plataforma</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 cursor-pointer">
                  <input type="radio" name="platform" checked={selectedPlatform === ''} onChange={() => setSelectedPlatform('')} className="accent-blue-500" />
                  Todas
                </label>
                {platforms.map(p => (
                  <label key={p} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 cursor-pointer">
                    <input type="radio" name="platform" checked={selectedPlatform === p} onChange={() => setSelectedPlatform(p)} className="accent-blue-500" />
                    {p}
                  </label>
                ))}
              </div>
            </div>

            {/* Genre Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">Gênero</label>
              <select 
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
              >
                <option value="">Todos os Gêneros</option>
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Store Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Loja</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 cursor-pointer">
                  <input type="radio" name="store" checked={selectedStore === ''} onChange={() => setSelectedStore('')} className="accent-blue-500" />
                  Todas
                </label>
                {Object.values(STORES).map(store => (
                  <label key={store.id} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 cursor-pointer">
                    <input type="radio" name="store" checked={selectedStore === store.id} onChange={() => setSelectedStore(store.id)} className="accent-blue-500" />
                    {store.name}
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Results Grid */}
        <main className="flex-grow">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game, idx) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Nenhum jogo encontrado</h3>
              <p className="text-slate-400">
                Tente ajustar seus filtros ou buscar por termos diferentes.
              </p>
              <button 
                onClick={() => {
                  setSearchParams({});
                  setSelectedPlatform('');
                  setSelectedGenre('');
                  setSelectedStore('');
                  setMaxPrice(300);
                }}
                className="mt-6 text-blue-400 hover:text-blue-300 font-medium"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
