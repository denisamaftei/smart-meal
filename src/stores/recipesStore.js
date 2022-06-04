import { defineStore } from "pinia";
import Axios from "axios";

const api = "https://api.edamam.com/api/recipes/v2?type=public&q=";

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
    async getRecipesCategories(mainIngredient) {
      try {
        const response = await Axios.get(
          api +
            mainIngredient +
            "&app_id=412ac3e0&app_key=225acfa86996aa4b29e329d9baf0584c"
        );

        for (let i = 0; i < response.data.hits.length; i++) {
          this.recipes[i] = response.data.hits[i].recipe;
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
