import React from 'react';
import { MOCK_GAMES } from '../data';
import GameCard from '../components/GameCard';
import { Heart, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const favoriteGames = MOCK_GAMES.slice(0, 3); // Simulando alguns favoritos

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
          <Heart className="w-6 h-6 text-red-500 fill-current" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Meus Favoritos</h1>
          <p className="text-slate-400">Você tem {favoriteGames.length} jogos salvos na sua lista de desejos.</p>
        </div>
      </div>

      {favoriteGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteGames.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-slate-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Sua lista está vazia</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-8">
            Você ainda não adicionou nenhum jogo aos seus favoritos. Navegue pelas ofertas e clique no coração para salvar os jogos que você deseja acompanhar.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            <Search className="w-5 h-5" />
            Explorar Ofertas
          </Link>
        </div>
      )}
    </div>
  );
}
