"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface daysData {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

// Unsplash API setup
const UNSPLASH_ACCESS_KEY = "AhoJYjpuEChddDraRjnXEJpKC2RZ_8ElpAdnLorFQrw";
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";

// Component to fetch and display meal images
const MealPlanImages: React.FC<any> = ({ daysData }) => {
  // Parse the meal plan text using regex

  console.log(daysData);

  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [mealImages, setMealImages] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);

  const currentDayMeals = daysData[currentDayIndex];

  // Function to fetch image from Unsplash API
  const fetchImage = useCallback(async (query: string) => {
    try {
      const response = await axios.get(UNSPLASH_API_URL, {
        params: {
          query,
          client_id: UNSPLASH_ACCESS_KEY,
          per_page: 1,
          orientation: "portrait",
        },
      });
      return response.data.results[0]?.urls?.small || "";
    } catch (error) {
      console.error("Error fetching image:", error);
      return "";
    }
  }, []);

  useEffect(() => {
    // Fetch images for the current day's meals only when the day changes
    const fetchImagesForMeals = async () => {
      console.log(currentDayMeals.breakfast);
      setLoading(true);
      const breakfastImage = await fetchImage(currentDayMeals.breakfast);
      const lunchImage = await fetchImage(currentDayMeals.lunch);
      const dinnerImage = await fetchImage(currentDayMeals.dinner);

      setMealImages({
        breakfast: breakfastImage,
        lunch: lunchImage,
        dinner: dinnerImage,
      });
      setLoading(false);
    };

    fetchImagesForMeals();
  }, [currentDayMeals.day]);

  const handleDayChange = (direction: "prev" | "next") => {
    setCurrentDayIndex((prevIndex) =>
      direction === "prev"
        ? prevIndex === 0
          ? daysData.length - 1
          : prevIndex - 1
        : prevIndex === daysData.length - 1
        ? 0
        : prevIndex + 1,
    );
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">
        Meal Plan for {currentDayMeals.day}
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {["breakfast", "lunch", "dinner"].map((mealType) => {
          const mealName =
            currentDayMeals[mealType as keyof typeof currentDayMeals];
          return (
            <div key={mealType} className="meal-item group relative">
              <div
                className="absolute bottom-0 left-0 w-full truncate bg-black bg-opacity-50 px-4 py-2 text-center text-white"
                title={mealName}
              >
                {mealName}
              </div>
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : (
                <img
                  src={mealImages[mealType]}
                  alt={mealName}
                  className="h-48 w-full rounded object-cover"
                />
              )}

              <div
                className="absolute left-0 top-0 w-full truncate bg-black bg-opacity-50 px-4 py-2 text-center text-white"
                title={mealName}
              >
                {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="top-2 mt-4 flex justify-between">
        <button
          onClick={() => handleDayChange("prev")}
          className="rounded bg-gray-200 px-4 py-2"
        >
          Previous Day
        </button>
        <button
          onClick={() => handleDayChange("next")}
          className="rounded bg-gray-200 px-4 py-2"
        >
          Next Day
        </button>
      </div>
    </div>
  );
};

export default MealPlanImages;
