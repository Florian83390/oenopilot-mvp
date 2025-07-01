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
    taster: "Laurent Dubois"
  };

  // 15 échantillons pour le benchmark
  const samples = [
    { id: 1, name: "Échantillon 1", producer: "Domaine A", appellation: "Côtes de Provence" },
    { id: 2, name: "Échantillon 2", producer: "Domaine B", appellation: "Côtes de Provence" },
    { id: 3, name: "Échantillon 3", producer: "Domaine C", appellation: "Côtes de Provence" },
    { id: 4, name: "Échantillon 4", producer: "Domaine D", appellation: "Côtes de Provence Sainte-Victoire" },
    { id: 5, name: "Échantillon 5", producer: "Domaine E", appellation: "Côtes de Provence" },
    { id: 6, name: "Échantillon 6", producer: "Domaine F", appellation: "Côtes de Provence Fréjus" },
    { id: 7, name: "Échantillon 7", producer: "Domaine G", appellation: "Côtes de Provence" },
    { id: 8, name: "Échantillon 8", producer: "Domaine H", appellation: "Côtes de Provence La Londe" },
    { id: 9, name: "Échantillon 9", producer: "Domaine I", appellation: "Côtes de Provence" },
    { id: 10, name: "Échantillon 10", producer: "Domaine J", appellation: "Côtes de Provence Pierrefeu" },
    { id: 11, name: "Échantillon 11", producer: "Domaine K", appellation: "Côtes de Provence" },
    { id: 12, name: "Échantillon 12", producer: "Domaine L", appellation: "Côtes de Provence" },
    { id: 13, name: "Échantillon 13", producer: "Domaine M", appellation: "Côtes de Provence" },
    { id: 14, name: "Échantillon 14", producer: "Domaine N", appellation: "Côtes de Provence" },
    { id: 15, name: "Échantillon 15", producer: "Domaine O", appellation: "Côtes de Provence" }
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
        <div
