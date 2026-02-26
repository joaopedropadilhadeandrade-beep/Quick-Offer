import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Heart, User, Menu, Settings, LogOut, X, ExternalLink } from 'lucide-react';
import { MOCK_GAMES } from '../data';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<'notif' | 'fav' | 'user' | null>(null);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setOpenDropdown(null);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown: 'notif' | 'fav' | 'user') => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Mock data for dropdowns
  const notifications = [
    { id: 1, text: 'The Witcher 3 atingiu o preço desejado: R$ 39,97!', time: 'Há 2 horas', unread: true },
    { id: 2, text: 'Nova promoção da Steam: Até 80% OFF em RPGs.', time: 'Há 5 horas', unread: true },
    { id: 3, text: 'Cyberpunk 2077 está com 50% de desconto.', time: 'Ontem', unread: false },
  ];

  const favoriteGames = MOCK_GAMES.slice(0, 3);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={() => setOpenDropdown(null)}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Quick Offer</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl px-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-full leading-5 bg-slate-800/50 text-slate-200 placeholder-slate-400 focus:outline-none focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors"
                placeholder="Buscar jogos, lojas ou gêneros..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4" ref={dropdownRef}>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('notif')}
                className={`p-2 transition-colors relative rounded-full ${openDropdown === 'notif' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
              
              {openDropdown === 'notif' && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white">Notificações</h3>
                    <button className="text-xs text-blue-400 hover:text-blue-300">Marcar lidas</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/50 last:border-0 ${notif.unread ? 'bg-slate-800/30' : ''}`}>
                        <p className="text-sm text-slate-300 mb-1">{notif.text}</p>
                        <span className="text-xs text-slate-500">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-800 text-center">
                    <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">Ver todas as notificações</button>
                  </div>
                </div>
              )}
            </div>

            {/* Favorites */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => toggleDropdown('fav')}
                className={`p-2 transition-colors rounded-full ${openDropdown === 'fav' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Heart className="h-5 w-5" />
              </button>

              {openDropdown === 'fav' && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <h3 className="text-sm font-bold text-white">Meus Favoritos</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2 space-y-2">
                    {favoriteGames.map(game => (
                      <Link 
                        key={game.id} 
                        to={`/game/${game.id}`}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg transition-colors group"
                      >
                        <img src={game.coverImage} alt={game.title} className="w-10 h-14 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate group-hover:text-blue-400">{game.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-emerald-400">R$ {game.currentPrice.toFixed(2)}</span>
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">-{game.discount}%</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-800 text-center">
                    <Link to="/favorites" onClick={() => setOpenDropdown(null)} className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                      Ver todos os favoritos
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>
            
            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('user')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors rounded-full pl-1 pr-3 py-1 ${openDropdown === 'user' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden sm:block">Minha Conta</span>
              </button>

              {openDropdown === 'user' && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-800 mb-2">
                    <p className="text-sm font-bold text-white">Olá, Gamer!</p>
                    <p className="text-xs text-slate-400 truncate">gamer@exemplo.com</p>
                  </div>
                  
                  <Link to="/settings" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                    <Settings className="w-4 h-4" />
                    Configurações
                  </Link>
                  <Link to="/favorites" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors sm:hidden">
                    <Heart className="w-4 h-4" />
                    Meus Favoritos
                  </Link>
                  
                  <div className="border-t border-slate-800 mt-2 pt-2">
                    <Link to="/login" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Sair da conta
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 text-slate-400 hover:text-white transition-colors md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
