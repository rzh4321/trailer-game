"use client";
import { createContext, useState, useContext, useEffect } from "react";
import useCategories from "./useCategories";
import type { categoryWithImageAndUrlType } from "@/types";

type CategoryContextType = {
  filteredCategories: categoryWithImageAndUrlType[] | undefined;
  filterCategories: (searchTerm: string) => void;
  sortCategories: (filter: string) => void;
  toggleAudScore: (filter: "fresh" | "rotten") => void;
  toggleTomatometer: (filter: "fresh" | "rotten" | "certified") => void;
  toggleCertifiedFresh: () => void;
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
  const [tomatometerFilter, setTomatometerFilter] = useState({
    fresh: false,
    rotten: false,
    certified: false,
  });
  const [audScoreFilter, setAudScoreFilter] = useState({
    fresh: false,
    rotten: false,
  });
  const [certifiedFresh, setCertifiedFresh] = useState(false);

  useEffect(() => {
    setOriginalCategories(finalCategories);
    setFilteredCategories(finalCategories);
  }, [finalCategories]);

  const applyFiltersAndSorts = (
    categories: categoryWithImageAndUrlType[] | undefined,
  ) => {
    let result = categories ?? [];

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
      console.log("HI2");
      result = result.filter(
        (category) =>
          category.audienceScore !== null &&
          category.audienceScore !== undefined &&
          category.audienceScore >= 60,
      );
    } else if (audScoreFilter.rotten) {
      console.log("HI");
      result = result.filter(
        (category) =>
          category.audienceScore !== null &&
          category.audienceScore !== undefined &&
          category.audienceScore < 60,
      );
    }

    // Apply tomatometer filter
    if (
      tomatometerFilter.fresh &&
      tomatometerFilter.rotten &&
      tomatometerFilter.certified
    ) {
    } else if (tomatometerFilter.certified && tomatometerFilter.fresh) {
      result = result.filter((category) => category.criticScore ?? 0 >= 60);
    } else if (tomatometerFilter.certified && tomatometerFilter.rotten) {
      result = result.filter(
        (category) =>
          (category.criticScore ?? 0 >= 90) || (category.criticScore ?? 0 < 60),
      );
    } else if (tomatometerFilter.fresh && tomatometerFilter.rotten) {
      result = result.filter((category) => category.criticScore ?? 0 < 90);
    } else if (tomatometerFilter.certified) {
      result = result.filter(
        (category) =>
          category.criticScore !== null &&
          category.criticScore !== undefined &&
          category.criticScore >= 90,
      );
    } else if (tomatometerFilter.fresh) {
      result = result.filter(
        (category) =>
          category.criticScore !== null &&
          category.criticScore !== undefined &&
          category.criticScore >= 60,
      );
    } else if (tomatometerFilter.rotten) {
      result = result.filter(
        (category) =>
          category.criticScore !== null &&
          category.criticScore !== undefined &&
          category.criticScore < 60,
      );
    }

    if (certifiedFresh) {
      result = result.filter(
        (category) =>
          category.criticScore !== null &&
          category.criticScore !== undefined &&
          category.criticScore >= 90,
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

  const toggleTomatometer = (filter: "fresh" | "rotten" | "certified") => {
    setTomatometerFilter((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const toggleCertifiedFresh = () => {
    setCertifiedFresh((prev) => !prev);
  };

  useEffect(() => {
    if (originalCategories) {
      applyFiltersAndSorts(originalCategories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchTerm,
    sortFilter,
    originalCategories,
    audScoreFilter,
    tomatometerFilter,
    certifiedFresh,
  ]);

  return (
    <CategoryContext.Provider
      value={{
        filteredCategories,
        filterCategories,
        sortCategories,
        toggleAudScore,
        toggleTomatometer,
        toggleCertifiedFresh,
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
