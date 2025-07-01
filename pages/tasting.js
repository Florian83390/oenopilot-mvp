import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, User, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

const TastingInterface = () => {
  const [currentSample, setCurrentSample] = useState(0);
  const [tastingData, setTastingData] = useState({});

  // Session Benchmark Provence Rosé 2024
  const session = {
    name: "Benchmark Côtes de Provence Rosé 2024",
    date: "8 Juillet 2025", 
    location: "Cuers",
    taster: typeof window !== 'undefined' ? sessionStorage.getItem('participant') || 'Participant' : 'Participant'
  };

  // 15 échantillons pour le benchmark
const samples = [
  { id: 1, name: "Échantillon A", description: "Rosé de Provence 2024" },
  { id: 2, name: "Échantillon B", description: "Rosé de Provence 2024" },
  { id: 3, name: "Échantillon C", description: "Rosé de Provence 2024" },
  { id: 4, name: "Échantillon D", description: "Rosé de Provence 2024" },
  { id: 5, name: "Échantillon E", description: "Rosé de Provence 2024" },
  { id: 6, name: "Échantillon F", description: "Rosé de Provence 2024" },
  { id: 7, name: "Échantillon G", description: "Rosé de Provence 2024" },
  { id: 8, name: "Échantillon H", description: "Rosé de Provence 2024" },
  { id: 9, name: "Échantillon I", description: "Rosé de Provence 2024" },
  { id: 10, name: "Échantillon J", description: "Rosé de Provence 2024" },
  { id: 11, name: "Échantillon K", description: "Rosé de Provence 2024" },
  { id: 12, name: "Échantillon L", description: "Rosé de Provence 2024" },
  { id: 13, name: "Échantillon M", description: "Rosé de Provence 2024" },
  { id: 14, name: "Échantillon N", description: "Rosé de Provence 2024" },
  { id: 15, name: "Échantillon O", description: "Rosé de Provence 2024" }
];

  // Familles aromatiques spécifiques au rosé
  const aromaticFamilies = [
    "Fruits blancs", "Fruits rouges", "Floral", "Agrumes", "Amylique", 
    "Minéral", "Épicé", "Herbacé"
  ];

  const priorities = ["GDG", "R1", "R2", "R3", "RR", "GALLO"];

  const handleInputChange = (field, value) => {
    setTastingData(prev => ({
      ...prev,
      [currentSample]: {
        ...prev[currentSample],
        [field]: value
      }
    }));
  };

  const handleAromaticToggle = (aroma) => {
    const current = tastingData[currentSample]?.aromatics || [];
    const updated = current.includes(aroma) 
      ? current.filter(a => a !== aroma)
      : [...current, aroma];
    
    handleInputChange('aromatics', updated);
  };

  const moveAromaticUp = (aroma) => {
    const current = tastingData[currentSample]?.aromatics || [];
    const index = current.indexOf(aroma);
    if (index > 0) {
      const updated = [...current];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      handleInputChange('aromatics', updated);
    }
  };

  const moveAromaticDown = (aroma) => {
    const current = tastingData[currentSample]?.aromatics || [];
    const index = current.indexOf(aroma);
    if (index < current.length - 1) {
      const updated = [...current];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      handleInputChange('aromatics', updated);
    }
  };

  const handlePriorityToggle = (priority) => {
    const current = tastingData[currentSample]?.selectedPriorities || [];
    const updated = current.includes(priority) 
      ? current.filter(p => p !== priority)
      : [...current, priority];
    
    handleInputChange('selectedPriorities', updated);
  };

  const movePriorityUp = (priority) => {
    const current = tastingData[currentSample]?.selectedPriorities || [];
    const index = current.indexOf(priority);
    if (index > 0) {
      const updated = [...current];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      handleInputChange('selectedPriorities', updated);
    }
  };

  const movePriorityDown = (priority) => {
    const current = tastingData[currentSample]?.selectedPriorities || [];
    const index = current.indexOf(priority);
    if (index < current.length - 1) {
      const updated = [...current];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      handleInputChange('selectedPriorities', updated);
    }
  };

  const getCurrentData = () => tastingData[currentSample] || {};

  const nextSample = () => {
    if (currentSample < samples.length - 1) {
      setCurrentSample(currentSample + 1);
    }
  };

  const prevSample = () => {
    if (currentSample > 0) {
      setCurrentSample(currentSample - 1);
    }
  };

  const currentSampleData = samples[currentSample];
  const currentTasting = getCurrentData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-rose-400">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-rose-600">🍷 OenoPilot</Link>
              <div className="hidden md:block text-sm text-gray-600">
                <span className="font-medium">Interface de Dégustation</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User size={16} />
                <span>{session.taster}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Info */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <h1 className="font-semibold text-gray-800 mb-2 md:mb-0">
              {session.name}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{session.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{session.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Navigation échantillons */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={prevSample}
              disabled={currentSample === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all"
            >
              <ChevronLeft size={20} />
              <span>Précédent</span>
            </button>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">
                Échantillon {currentSample + 1}/{samples.length}
              </div>
              <div className="text-lg font-semibold text-gray-700">
                {currentSampleData.name}
              </div>
            </div>
            
            <button 
              onClick={nextSample}
              disabled={currentSample === samples.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all"
            >
              <span>Suivant</span>
              <ChevronRight size={20} />
            </button>
          </div>

        {/* Infos échantillon */}
<div className="card-enhanced rounded-xl p-6 animate-fade-in-up">
  <h3 className="gradient-text text-xl font-bold mb-4">Informations échantillon</h3>
  <div className="text-center">
    <div className="text-lg font-semibold text-gray-800">{currentSampleData.name}</div>
    <div className="text-sm text-gray-600 mt-2">Session anonymisée - Benchmark 2024</div>
  </div>
</div>

        {/* Grille de dégustation */}
     <div className="card-enhanced rounded-xl shadow-xl p-8 animate-fade-in-up">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Évaluation sensorielle</h2>
          
          <div className="space-y-6">
            {/* Couleur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Couleur (du gris au rose franc)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentTasting.color || 5}
                onChange={(e) => handleInputChange('color', parseInt(e.target.value))}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, #9CA3AF 0%, #F3F4F6 20%, #FECACA 40%, #FCA5A5 60%, #F87171 80%, #DC2626 100%)'
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Gris</span>
                <span>Gris rosé</span>
                <span>Rose pâle</span>
                <span>Rose</span>
                <span>Rose franc</span>
              </div>
              <div className="text-center mt-2 text-sm font-medium text-gray-700">
                Intensité: {currentTasting.color || 5}/10
              </div>
            </div>

            {/* Netteté et Intensité */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Netteté aromatique</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={currentTasting.clarity || 3}
                  onChange={(e) => handleInputChange('clarity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Faible</span>
                  <span>Moyenne</span>
                  <span>Excellente</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Intensité aromatique</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={currentTasting.intensity || 3}
                  onChange={(e) => handleInputChange('intensity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Discrète</span>
                  <span>Moyenne</span>
                  <span>Puissante</span>
                </div>
              </div>
            </div>

            {/* Familles aromatiques avec drag & drop */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Familles aromatiques (sélection multiple + classement par intensité)
              </label>
              
              <div className="mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {aromaticFamilies.map(aroma => {
                    const isSelected = (currentTasting.aromatics || []).includes(aroma);
                    return (
                      <button
                        key={aroma}
                        onClick={() => handleAromaticToggle(aroma)}
                        className={`aromatic-btn p-3 text-sm rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'selected border-rose-500 bg-rose-100 text-rose-700' 
                            : 'border-gray-200 hover:border-rose-300 bg-white'
                        }`}
                      >
                        {aroma}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {currentTasting.aromatics && currentTasting.aromatics.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Classement par ordre d'intensité perçue :
                  </h4>
                  <div className="space-y-2">
                    {currentTasting.aromatics.map((aroma, index) => (
                      <div key={aroma} className="flex items-center justify-between bg-white rounded-lg p-3 border">
                        <div className="flex items-center space-x-3">
                          <span className="bg-rose-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium">{aroma}</span>
                          <span className="text-xs text-gray-500">
                            {index === 0 ? '(dominant)' : 
                             index === 1 ? '(secondaire)' : 
                             index === 2 ? '(tertiaire)' : 
                             `(${index + 1}ème)`}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => moveAromaticUp(aroma)}
                            disabled={index === 0}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveAromaticDown(aroma)}
                            disabled={index === currentTasting.aromatics.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Équilibre en bouche */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Volume en bouche</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={currentTasting.volume || 3}
                  onChange={(e) => handleInputChange('volume', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Léger</span>
                  <span>Ample</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Équilibre</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={currentTasting.balance || 3}
                  onChange={(e) => handleInputChange('balance', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Déséquilibré</span>
                  <span>Parfait</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Longueur</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={currentTasting.length || 3}
                  onChange={(e) => handleInputChange('length', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Courte</span>
                  <span>Persistante</span>
                </div>
              </div>
            </div>

            {/* Note finale et priorité */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Note globale /20</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={currentTasting.score || 10}
                  onChange={(e) => handleInputChange('score', parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>10</span>
                  <span>20</span>
                </div>
                <div className="text-center mt-2 text-lg font-bold text-rose-600">
                  {currentTasting.score || 10}/20
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Priorités commerciales (sélection multiple + classement)
                </label>
                
                <div className="mb-4">
                  <div className="grid grid-cols-3 gap-2">
                    {priorities.map(priority => {
                      const isSelected = (currentTasting.selectedPriorities || []).includes(priority);
                      return (
                        <button
                          key={priority}
                          onClick={() => handlePriorityToggle(priority)}
                          className={`p-2 text-xs rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-rose-500 bg-rose-100 text-rose-700' 
                              : 'border-gray-200 hover:border-rose-300 bg-white'
                          }`}
                        >
                          {priority}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {currentTasting.selectedPriorities && currentTasting.selectedPriorities.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Classement par ordre de priorité :
                    </h4>
                    <div className="space-y-2">
                      {currentTasting.selectedPriorities.map((priority, index) => (
                        <div key={priority} className="flex items-center justify-between bg-white rounded-lg p-2 border">
                          <div className="flex items-center space-x-2">
                            <span className="bg-rose-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span className="text-sm font-medium">{priority}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => movePriorityUp(priority)}
                              disabled={index === 0}
                              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => movePriorityDown(priority)}
                              disabled={index === currentTasting.selectedPriorities.length - 1}
                              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              ↓
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Commentaires */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Commentaires libres</label>
              <textarea
                value={currentTasting.comments || ''}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                rows="3"
                placeholder="Observations particulières, notes de dégustation..."
              />
            </div>
          </div>

          {/* Bouton de sauvegarde */}
          <div className="mt-8 flex justify-center">
<button className="btn-primary flex items-center space-x-2 px-8 py-4 text-white rounded-xl font-semibold transition-all">              <Save size={20} />
              <span>Sauvegarder cette évaluation</span>
            </button>
          </div>
        </div>

        {/* Progression */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Progression du benchmark</span>
            <span>{currentSample + 1}/{samples.length} échantillons</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-rose-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSample + 1) / samples.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TastingInterface;
