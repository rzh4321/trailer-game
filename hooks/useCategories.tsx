import { useState, useEffect } from "react";
import type { movieWithVideoIdAndImageType } from "@/types";
import getCategories from "@/actions/getCategories";
import type { linkCategoryType, categoryType, categoryWithImageAndUrlType } from "@/types";
import categoryImagesAndUrls from "@/categories";

import { categories } from "@/schema";

export default function useCategories() {
  const [dbCategories, setDbCategories] = useState<categoryType[]>([]);
  const [averages, setAverages] = useState({});
  const [finalCategories, setFinalCategories] = useState<categoryWithImageAndUrlType[]>()


  useEffect(() => {
    const fetchCategoriesAndAverages = async () => {
      const {dbCategories, avgAudience, avgCritic} = await getCategories();
      setDbCategories(dbCategories);
      setAverages({avgAudience, avgCritic});
    };
    fetchCategoriesAndAverages();
  }, []);

  useEffect(() => {
    if (dbCategories?.length === 19 && "avgCritic" in averages && "avgAudience" in averages) {
            let combinedArray = dbCategories.map(category => {
                const matchedImageAndUrl = categoryImagesAndUrls.find(item => item.id === category.id);
                return {
                  id: category.id,
                  name: matchedImageAndUrl?.name as string,
                  criticScore: category.criticScore,
                  audienceScore: category.audienceScore,
                  url: matchedImageAndUrl?.url!,
                  image: matchedImageAndUrl?.image!,
                };
              });
              // include the All card, get the average scores
              combinedArray = [{ 
                  id: 0,
                  name: "All",
              url: "/play/all",
              image:
                "https://www.rd.com/wp-content/uploads/2021/11/family-movies-opener-F.jpg?fit=700%2C467",
              criticScore: averages.avgCritic as number,
              audienceScore: averages.avgAudience as number,
              }, ...combinedArray]
              setFinalCategories(combinedArray);
                
            
    }
  }, [dbCategories, averages]);

  return finalCategories;
}
