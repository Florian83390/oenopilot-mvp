import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const router = useRouter();

  const participants = [
    'Florian LACROUX',
    'Mathilde SIMON', 
    'Aurélien TOLMONT',
    'Pierre PUCHTA',
    'Rosine LAUZIERE',
    'Frédéric FABRE',
    'Arnaud MORAND',
    'Fabrice MACIA'
  ];

  const handleLogin = () => {
    if (selectedParticipant) {
      // Stocker le nom du participant
      sessionStorage.setItem('participant', selectedParticipant);
      // Rediriger vers l'interface de dégustation
      router.push('/tasting');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-rose-600 mb-2 block">🍷 OenoPilot</Link>
          <p className="text-gray-600 mb-2">Benchmark Côtes de Provence Rosé 2024</p>
          <p className="text-sm text-gray-500">8 Juillet 2025 - Cuers</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sélectionnez votre nom :
            </label>
            <select
              value={selectedParticipant}
              onChange={(e) => setSelectedParticipant(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-lg"
            >
              <option value="">-- Choisir un participant --</option>
              {participants.map((participant, index) => (
                <option key={index} value={participant}>
                  {participant}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleLogin}
            disabled={!selectedParticipant}
            className="w-full py-4 px-4 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all text-lg"
          >
            Commencer la dégustation
          </button>
          
          <div className="text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Instructions :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Sélectionnez votre nom dans la liste</li>
            <li>• Vous évaluerez 15 échantillons anonymisés</li>
            <li>• Naviguez à votre rythme avec les boutons</li>
            <li>• Vos données sont sauvegardées automatiquement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
