'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Trendito
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre las últimas tendencias de moda en las mejores tiendas online. 
            Encuentra exactamente lo que buscas en un solo lugar.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar ropa, zapatos, accesorios..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all duration-200 shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                🔍 Buscar
              </button>
            </div>
          </form>

          {/* Popular Categories */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Categorías populares:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Vestidos', 'Zapatos', 'Bolsos', 'Accesorios', 
                'Jeans', 'Chaquetas', 'Blusas', 'Deportivo'
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSearchQuery(category);
                    router.push(`/search?q=${encodeURIComponent(category)}`);
                  }}
                  className="px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 hover:border-pink-300 hover:text-pink-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: '🛍️',
              title: 'Múltiples Tiendas',
              description: 'Busca en cientos de tiendas de moda online simultáneamente'
            },
            {
              icon: '⚡',
              title: 'Búsqueda Rápida',
              description: 'Encuentra productos al instante con nuestro motor de búsqueda avanzado'
            },
            {
              icon: '🎯',
              title: 'Resultados Precisos',
              description: 'Obtén resultados relevantes y actualizados de las mejores tiendas'
            }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Admin Link */}
        <div className="mt-12 text-center">
          <Link 
            href="/admin" 
            className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-pink-600 transition-colors"
          >
            ⚙️ Panel de Administración
          </Link>
        </div>
      </div>
    </div>
  );
}
