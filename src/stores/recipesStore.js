import { defineStore } from "pinia";
import Axios from "axios";

const api =
  "https://api.spoonacular.com/recipes/complexSearch?number=10&fillIngredients=true&addRecipeInformation=true&apiKey=e6a15b89c3dc47d0b3df5cfa8b568ed9";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    id: null,
    recipes: [],
  }),
  getters: {
    recipesCount: (state) => state.recipes.length,
    categoriesCount: (state) => state.categories.length,
  },
  actions: {
    async getRecipes() {
      try {
        const response = await Axios.get(api);

        for (let i = 0; i < response.data.results.length; i++) {
          this.recipes[i] = response.data.results[i];
        }
        return this.recipes;
      } catch (err) {}
    },
    // async getRecipeInfo() {
    //   try {
    //     const recipeId = 52772;
    //     const response = await Axios.get(api + "lookup.php?i=" + { recipeId });
    //     return response.data.meals;
    //   } catch (err) {
    //   }
    // },
    async getRecipesByIngredients(selectedIngredients) {
      try {
        const response = await Axios.get(
          api + "&includeIngredients=" + selectedIngredients
        );
        for (let i = 0; i < response.data.results.length; i++) {
          this.recipes[i] = response.data.results[i];
        }
        if (response.data.results.length === 0) {
          this.recipes = [];
        }

        return this.recipes;
      } catch (err) {}
    },
    // async filterRecipesByMainIngredients() {
    //   try {
    //     const mainIngredient = "chicken_breast";
    //     const response = await Axios.get(
    //       api + "list.php?i=" + { mainIngredient }
    //     );
    //     return response.data.meals;
    //   } catch (err) {
    //   }
    // },
  },
});
