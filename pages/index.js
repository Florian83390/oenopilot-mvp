import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-rose-600 mb-2">🍷 OenoPilot</h1>
          <p className="text-gray-600">Benchmark Côtes de Provence Rosé 2024</p>
        </div>
        
        <div className="space-y-4">
          <Link href="/tasting" className="block w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-center font-medium transition-all">
            Interface de Dégustation
          </Link>
          
          <Link href="/dashboard" className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center font-medium transition-all">
            Dashboard de Synthèse
          </Link>
          
          <Link href="/sessions" className="block w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-center font-medium transition-all">
            Gestion des Sessions
          </Link>
          
          <Link href="/admin" className="block w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-center font-medium transition-all">
            Administration
          </Link>
        </div>
      </div>
    </div>
  )
}
