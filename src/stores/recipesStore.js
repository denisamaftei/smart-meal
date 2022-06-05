import { defineStore } from "pinia";
import Axios from "axios";

const api =
  "https://api.spoonacular.com/recipes/complexSearch?apiKey=979b3d8b99e74fe29600f1a6c0add35f&number=1&fillIngredients=true";

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
        console.log(this.recipes);
        return this.recipes;
      } catch (err) {
        console.log(err);
      }
    },
    // async getRecipeInfo() {
    //   try {
    //     const recipeId = 52772;
    //     const response = await Axios.get(api + "lookup.php?i=" + { recipeId });
    //     return response.data.meals;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async getRecipesByMainIngredient() {
    //   try {
    //     const response = await Axios.get(api + "list.php?i=list");
    //     this.recipes = response.data.meals;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async filterRecipesByMainIngredients() {
    //   try {
    //     const mainIngredient = "chicken_breast";
    //     const response = await Axios.get(
    //       api + "list.php?i=" + { mainIngredient }
    //     );
    //     return response.data.meals;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
});
