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

  // 15 échantillons anonymisés A-O
  const samples = [
    { id: 1, name: "Échantillon A" },
    { id: 2, name: "Échantillon B" },
    { id: 3, name: "Échantillon C" },
    { id: 4, name: "Échantillon D" },
    { id: 5, name: "Échantillon E" },
    { id: 6, name: "Échantillon F" },
    { id: 7, name: "Échantillon G" },
    { id: 8, name: "Échantillon H" },
    { id: 9, name: "Échantillon I" },
    { id: 10, name: "Échantillon J" },
    { id: 11, name: "Échantillon K" },
    { id: 12, name: "Échantillon L" },
    { id: 13, name: "Échantillon M" },
    { id: 14, name: "Échantillon N" },
    { id: 15, name: "Échantillon O" }
  ];

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

  const handlePriorityToggle = (priority) => {
    const current = tastingData[currentSample]?.selectedPriorities || [];
    const updated = current.includes(priority) 
      ? current.filter(p => p !== priority)
      : [...current, priority];
    
    handleInputChange('selectedPriorities', updated);
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

  const exportData = () => {
    const exportData = [];
    
    for (let sampleIndex = 0; sampleIndex < samples.length; sampleIndex++) {
      const data = tastingData[sampleIndex];
      if (data) {
        exportData.push({
          participant: session.taster,
          echantillon: samples[sampleIndex].name,
          couleur: data.color || 'Non évalué',
          nettete: data.clarity || 'Non évalué',
          intensite: data.intensity || 'Non évalué',
          volume: data.volume || 'Non évalué',
          equilibre: data.balance || 'Non évalué',
          note: data.score || 'Non évalué',
          aromes: (data.aromatics || []).join('; '),
          priorites: (data.selectedPriorities || []).join('; '),
          commentaires: data.comments || ''
        });
      }
    }
    
    const csvContent = [
      ['Participant', 'Échantillon', 'Couleur/10', 'Netteté/5', 'Intensité/5', 'Volume/5', 'Équilibre/5', 'Note/20', 'Arômes', 'Priorités', 'Commentaires'],
      ...exportData.map(row => [
        row.participant, row.echantillon, row.couleur, row.nettete, row.intensite, 
        row.volume, row.equilibre, row.note, row.aromes, row.priorites, row.commentaires
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `benchmark_${session.taster.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
            <div className="flex items-center space-x-4">
              <button
                onClick={exportData}
                className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all"
              >
                <Save size={16} />
                <span>Export CSV</span>
              </button>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User size={16} />
                  <span>{session.taster}</span>
                </div>
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
                {currentSampleData.name}
              </div>
              <div className="text-lg text-gray-600">
                {currentSample + 1}/{samples.length}
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
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800">Rosé de Provence 2024</div>
              <div className="text-sm text-gray-600 mt-2">Session anonymisée - Benchmark</div>
            </div>
          </div>
        </div>

        {/* Grille de dégustation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
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
                className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Gris</span>
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
                  <span>Excellente</span>
                </div>
                <div className="text-center mt-1 text-sm font-medium">{currentTasting.clarity || 3}/5</div>
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
                  <span>Puissante</span>
                </div>
                <div className="text-center mt-1 text-sm font-medium">{currentTasting.intensity || 3}/5</div>
              </div>
            </div>

            {/* Familles aromatiques */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Familles aromatiques (sélection multiple)
              </label>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {aromaticFamilies.map(aroma => {
                  const isSelected = (currentTasting.aromatics || []).includes(aroma);
                  return (
                    <button
                      key={aroma}
                      onClick={() => handleAromaticToggle(aroma)}
                      className={`p-3 text-sm rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-100 text-rose-700' 
                          : 'border-gray-200 hover:border-rose-300 bg-white'
                      }`}
                    >
                      {aroma}
                    </button>
                  );
                })}
              </div>
              
              {/* Affichage des arômes sélectionnés */}
              {currentTasting.aromatics && currentTasting.aromatics.length > 0 && (
                <div className="mt-4 p-3 bg-rose-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Arômes sélectionnés :</h4>
                  <div className="text-sm text-gray-600">
                    {currentTasting.aromatics.join(' • ')}
                  </div>
                </div>
              )}
            </div>

            {/* Volume et Équilibre */}
            <div className="grid md:grid-cols-2 gap-6">
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
                <div className="text-center mt-1 text-sm font-medium">{currentTasting.volume || 3}/5</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Équilibre en bouche</label>
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
                <div className="text-center mt-1 text-sm font-medium">{currentTasting.balance || 3}/5</div>
              </div>
            </div>

            {/* Note finale */}
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

            {/* Priorités commerciales */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Priorités commerciales (sélection multiple)
              </label>
              
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
              
              {/* Affichage des priorités sélectionnées */}
              {currentTasting.selectedPriorities && currentTasting.selectedPriorities.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Priorités sélectionnées :</h4>
                  <div className="text-sm text-gray-600">
                    {currentTasting.selectedPriorities.join(' • ')}
                  </div>
                </div>
              )}
            </div>

            {/* Commentaires */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Commentaires libres</label>
              <textarea
                value={currentTasting.comments || ''}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                rows="3"
                placeholder="Observations particulières..."
              />
            </div>
          </div>

          {/* Bouton de sauvegarde */}
          <div className="mt-8 flex justify-center">
            <button className="flex items-center space-x-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-all shadow-lg">
              <Save size={20} />
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
