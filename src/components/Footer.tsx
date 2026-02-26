export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Quick Offer</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              O seu destino definitivo para encontrar as melhores promoções de jogos em todas as plataformas e lojas.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Plataformas</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">PC</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">PlayStation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Xbox</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Lojas</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Steam</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Epic Games</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">PlayStation Store</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Xbox Store</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Quick Offer. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
