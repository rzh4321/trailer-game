import { useState, useEffect } from "react";
import type { movieWithVideoIdAndImageType } from "@/types";
import getCategories from "@/actions/getCategories";
import type { linkCategoryType, categoryType, categoryWithImageAndUrlType } from "@/types";
import categoryImagesAndUrls from "@/categories";

export default function useCategories() {
  const [dbCategories, setDbCategories] = useState<categoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<categoryWithImageAndUrlType[]>()

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setDbCategories(res);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (dbCategories?.length === 19) {
        let combinedArray = dbCategories.map(category => {
            const matchedImageAndUrl = categoryImagesAndUrls.find(item => item.id === category.id);
            return {
              id: category.id,
              name: category.name,
              criticScore: category.criticScore,
              audienceScore: category.audienceScore,
              url: matchedImageAndUrl?.url!,
              image: matchedImageAndUrl?.image!,
            };
          });
          // include the All card
        combinedArray = [{ 
            id: 0,
            name: "All",
        url: "/play/all",
        image:
          "https://www.rd.com/wp-content/uploads/2021/11/family-movies-opener-F.jpg?fit=700%2C467",
        criticScore: 100,
        audienceScore: 100,
        }, ...combinedArray]
        setCategories(combinedArray);
          
      setLoading(false);
    }
  }, [dbCategories]);

  return { categories, loading };
}
