'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminPage() {
  const [storeUrl, setStoreUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const validateShopifyUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname.includes('myshopify.com') || 
             parsedUrl.hostname.includes('.com') ||
             parsedUrl.hostname.includes('.co');
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!storeUrl.trim()) {
      setMessage({ type: 'error', text: 'Por favor ingresa una URL de tienda' });
      return;
    }

    if (!validateShopifyUrl(storeUrl)) {
      setMessage({ type: 'error', text: 'Por favor ingresa una URL válida' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/index-store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: storeUrl.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: `Tienda indexada exitosamente: ${data.store.name}. Se agregaron ${data.productsCount} productos.` 
        });
        setStoreUrl('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al indexar la tienda' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-pink-600">
                Trendito
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-xl font-semibold text-gray-800">
                Panel de Administración
              </h1>
            </div>
            <Link 
              href="/" 
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Indexar Nueva Tienda Shopify
            </h2>
            <div className="text-gray-600 space-y-2">
              <p>
                Agrega una nueva tienda Shopify para indexar todos sus productos 
                en el buscador de Trendito.
              </p>
              <p className="text-sm">
                <strong>Ejemplos de URLs válidas:</strong>
              </p>
              <ul className="text-sm text-gray-500 list-disc list-inside ml-4">
                <li>https://tienda.myshopify.com</li>
                <li>https://www.ejemplo.com</li>
                <li>https://tienda.ejemplo.co</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label 
                  htmlFor="storeUrl" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  URL de la Tienda Shopify
                </label>
                <input
                  type="url"
                  id="storeUrl"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  placeholder="https://tienda.myshopify.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                  disabled={loading}
                />
              </div>

              {/* Message */}
              {message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  loading
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-pink-600 text-white hover:bg-pink-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Indexando tienda...
                  </span>
                ) : (
                  'Indexar Tienda'
                )}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>
              El proceso de indexación puede tomar varios minutos dependiendo 
              del número de productos en la tienda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 