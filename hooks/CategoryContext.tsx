"use client";
import { createContext, useState, useContext, useEffect } from "react";
import useCategories from "./useCategories";
import type { categoryWithImageAndUrlType } from "@/types";

type CategoryContextType = {
  filteredCategories: categoryWithImageAndUrlType[] | undefined;
  filterCategories: (searchTerm: string) => void;
  sortCategories: (filter: string) => void;
  toggleAudScore: (filter: "fresh" | "rotten") => void;
};

// Create the context
const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

// Create a provider component
export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const finalCategories = useCategories();
  const [originalCategories, setOriginalCategories] = useState<
    categoryWithImageAndUrlType[] | undefined
  >(finalCategories);
  const [filteredCategories, setFilteredCategories] = useState<
    categoryWithImageAndUrlType[] | undefined
  >(finalCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [audScoreFilter, setAudScoreFilter] = useState({
    fresh: false,
    rotten: false,
  });

  useEffect(() => {
    setOriginalCategories(finalCategories);
    setFilteredCategories(finalCategories);
  }, [finalCategories]);

  const applyFiltersAndSorts = (
    categories: categoryWithImageAndUrlType[] | undefined,
  ) => {
    let result = categories ?? [];
    console.log(audScoreFilter);

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((category) =>
        category.name.toLowerCase().includes(term),
      );
    }

    // Apply sort
    if (sortFilter === "AToZ") {
      result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortFilter === "highest") {
      result = result
        .slice()
        .sort((a, b) => (b.criticScore ?? 0) - (a.criticScore ?? 0));
    } else if (sortFilter === "lowest") {
      result = result
        .slice()
        .sort((a, b) => (a.criticScore ?? 0) - (b.criticScore ?? 0));
    } else if (sortFilter === "audHighest") {
      result = result
        .slice()
        .sort((a, b) => (b.audienceScore ?? 0) - (a.audienceScore ?? 0));
    } else if (sortFilter === "audLowest") {
      result = result
        .slice()
        .sort((a, b) => (a.audienceScore ?? 0) - (b.audienceScore ?? 0));
    }

    // Apply aud score filter
    if (audScoreFilter.fresh && audScoreFilter.rotten) {
    } else if (audScoreFilter.fresh) {
      result = result.filter((category) => category.audienceScore ?? 0 >= 60);
    } else if (audScoreFilter.rotten) {
      result = result.filter(
        (category) =>
          category.audienceScore !== null &&
          category.audienceScore !== undefined &&
          category.audienceScore < 60,
      );
    }

    setFilteredCategories(result);
  };

  const filterCategories = (term: string) => {
    setSearchTerm(term);
  };

  const sortCategories = (filter: string) => {
    setSortFilter(filter);
  };

  const toggleAudScore = (filter: "fresh" | "rotten") => {
    setAudScoreFilter((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  useEffect(() => {
    if (originalCategories) {
      applyFiltersAndSorts(originalCategories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortFilter, originalCategories, audScoreFilter]);

  return (
    <CategoryContext.Provider
      value={{
        filteredCategories,
        filterCategories,
        sortCategories,
        toggleAudScore,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to use the categorycontext
export const useFilteredCategories = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
