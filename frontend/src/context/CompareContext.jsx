import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleProfessor = (prof) => {
    setSelectedProfessors(prev => {
      const exists = prev.some(p => p.id === prof.id);
      if (exists) {
        return prev.filter(p => p.id !== prof.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 professors at a time.');
        return prev;
      }
      const updated = [...prev, prof];
      setIsDrawerOpen(true);
      return updated;
    });
  };

  const removeProfessor = (profId) => {
    setSelectedProfessors(prev => prev.filter(p => p.id !== profId));
  };

  const clearAll = () => {
    setSelectedProfessors([]);
    setIsDrawerOpen(false);
  };

  const isSelected = (profId) => {
    return selectedProfessors.some(p => p.id === profId);
  };

  return (
    <CompareContext.Provider value={{
      selectedProfessors,
      isDrawerOpen,
      setIsDrawerOpen,
      toggleProfessor,
      removeProfessor,
      clearAll,
      isSelected
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
