'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import useCategories from './useCategories';
import type { categoryWithImageAndUrlType } from '@/types';

type CategoryContextType = {
    filteredCategories: categoryWithImageAndUrlType[] | undefined;
    filterCategories : (searchTerm: string) => void;
    sortCategories : (filter: string) => void;

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

  const sortCategories = (filter : string) => {
    let newFilteredCategories;
    if (filter === 'AToZ') {
      newFilteredCategories = finalCategories?.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (filter === 'highest') {
      newFilteredCategories = finalCategories?.slice().sort((a, b) => b.criticScore ?? 0 - (a.criticScore ?? 0));

    }
    else if (filter === 'lowest') {
      newFilteredCategories = finalCategories?.slice().sort((a, b) => a.criticScore ?? 0 - (b.criticScore ?? 0));

    }
    setFilteredCategories(newFilteredCategories);
  }

  useEffect(() => {
    setFilteredCategories(finalCategories);
  }, [finalCategories]);

  return (
    <CategoryContext.Provider value={{ filteredCategories, filterCategories, sortCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to use the categorycontext
export const useFilteredCategories = ():CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}