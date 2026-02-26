import { useParams, Link } from 'react-router-dom';
import { MOCK_GAMES, STORES } from '../data';
import { motion } from 'motion/react';
import { ArrowLeft, Bell, ExternalLink, Heart, Share2, Star, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GameDetails() {
  const { id } = useParams();
  const game = MOCK_GAMES.find(g => g.id === id);

  if (!game) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-slate-300">Jogo não encontrado</h2>
        <Link to="/" className="text-blue-500 hover:underline">Voltar para a página inicial</Link>
      </div>
    );
  }

  const mainStore = STORES[game.storeId];

  return (
    <div className="pb-20">
      {/* Header / Hero */}
      <div className="relative h-[40vh] min-h-[400px] w-full">
        <div className="absolute inset-0">
          <img 
            src={game.coverImage} 
            alt={game.title} 
            className="w-full h-full object-cover object-top blur-sm opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-48 md:w-64 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <img 
                src={game.coverImage} 
                alt={game.title} 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-grow"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {game.genres.map(g => (
                  <span key={g} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                    {g}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                {game.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold text-white text-lg">{game.rating}</span>
                  <span>/ 5.0</span>
                </div>
                <div className="h-4 w-px bg-slate-700"></div>
                <div>Lançamento: <span className="text-white">{new Date(game.releaseDate).toLocaleDateString('pt-BR')}</span></div>
                <div className="h-4 w-px bg-slate-700"></div>
                <div className="flex gap-2">
                  {game.platforms.map(p => (
                    <span key={p} className="text-white font-medium">{p}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Info & Chart */}
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Sobre o Jogo</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {game.description}
              </p>
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-blue-400" />
                  Histórico de Preços
                </h2>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={game.priceHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(value) => `R$${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                      itemStyle={{ color: '#38bdf8' }}
                      formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Preço']}
                    />
                    <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#60a5fa' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* Right Column: Buy Actions & Stores */}
          <div className="space-y-6">
            
            {/* Main Offer Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Melhor Oferta</span>
                <div className="flex gap-2">
                  <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="Adicionar aos Favoritos">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="Criar Alerta">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="Compartilhar">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-end gap-4 mb-6">
                {game.discount > 0 && (
                  <div className="bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1.5 rounded-lg text-xl border border-emerald-500/20">
                    -{game.discount}%
                  </div>
                )}
                <div className="flex flex-col">
                  {game.discount > 0 && (
                    <span className="text-slate-500 line-through text-sm">
                      R$ {game.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span className="text-4xl font-black text-white leading-none">
                    R$ {game.currentPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <a 
                href={game.prices.find(p => p.storeId === game.storeId)?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-lg mb-4"
              >
                Comprar na {mainStore?.name}
                <ExternalLink className="w-5 h-5" />
              </a>

              <p className="text-xs text-center text-slate-500">
                Redirecionamento seguro para a loja oficial.
              </p>
            </div>

            {/* Other Stores */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Comparar Preços</h3>
              <div className="space-y-3">
                {game.prices.sort((a,b) => a.price - b.price).map((priceInfo, idx) => {
                  const store = STORES[priceInfo.storeId];
                  const isBest = idx === 0;
                  
                  return (
                    <a 
                      key={priceInfo.storeId}
                      href={priceInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-3 rounded-xl border transition-colors group ${
                        isBest ? 'bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/30' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: store?.color || '#333' }}
                        >
                          {store?.logo}
                        </div>
                        <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                          {store?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-bold ${isBest ? 'text-emerald-400' : 'text-slate-300'}`}>
                          R$ {priceInfo.price.toFixed(2).replace('.', ',')}
                        </span>
                        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
