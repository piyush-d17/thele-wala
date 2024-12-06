import axios from "axios";
import { useEffect, useState } from "react";

interface Category {
  _id: string; // Unique identifier for the category
  name: string; // Name of the category
  subcategories: string[]; // List of subcategories as an array of strings
  createdAt: string; // ISO timestamp of creation
  __v: number; // Version key (typically used in MongoDB)
}

interface Data {
  allcate: Category[]; // Array of categories
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/cate/view",{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
      });
      const fetchedCategories: Category[] = response.data.categories;
      setCategories(fetchedCategories);

      // Automatically set the first category as the selected one
      if (fetchedCategories.length > 0) {
        setSelectedCategory(fetchedCategories[0]);
      }
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Dependency array ensures it runs only once

  return {
    categories,
    selectedCategory,
    setSelectedCategory, // Expose this function to allow manual updates
    loading,
    error,
  };
};

export default useCategories;
