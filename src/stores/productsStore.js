import { defineStore } from "pinia";
import Axios from "axios";

const api = "https://www.themealdb.com/api/json/v1/1";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    id: null,
    recipes: [],
    categories: [],
  }),
  getters: {
    recipesCount: (state) => state.recipes.length,
    categoriesCount: (state) => state.categories.length,
  },
  actions: {
    async getRecipesCategories() {
      try {
        const response = await Axios.get(api + "/list.php?c=list");
        this.categories = response.data.meals;
        console.log(this.categories);
        return this.categories;
      } catch (err) {
        console.log(err);
      }
    },
    async getRecipeInfo() {
      try {
        const recipeId = 52772;
        const response = await Axios.get(api + "lookup.php?i=" + { recipeId });
        return response.data.meals;
      } catch (err) {
        console.log(err);
      }
    },
    async getRecipesByMainIngredient() {
      try {
        const response = await Axios.get(api + "list.php?i=list");
        this.recipes = response.data.meals;
      } catch (err) {
        console.log(err);
      }
    },
    async filterRecipesByMainIngredients() {
      try {
        const mainIngredient = "chicken_breast";
        const response = await Axios.get(
          api + "list.php?i=" + { mainIngredient }
        );
        return response.data.meals;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
