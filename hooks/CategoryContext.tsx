'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import useCategories from './useCategories';
import type { categoryWithImageAndUrlType } from '@/types';

type CategoryContextType = {
    filteredCategories: categoryWithImageAndUrlType[] | undefined;
    filterCategories : (searchTerm: string) => void;
}

// Create the context
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Create a provider component
export const CategoryProvider = ({ children } : {children: React.ReactNode}) => {
    const finalCategories  = useCategories();
  const [filteredCategories, setFilteredCategories] = useState(finalCategories);
  const filterCategories = (searchTerm : string) => {
    const term = searchTerm.toLowerCase();
    const newFilteredCategories = finalCategories?.filter(category =>
      category.name.toLowerCase().includes(term)
    );
    setFilteredCategories(newFilteredCategories);
  };

  useEffect(() => {
    setFilteredCategories(finalCategories);
  }, [finalCategories]);

  return (
    <CategoryContext.Provider value={{ filteredCategories, filterCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to use the MovieContext
export const useFilteredCategories = ():CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}