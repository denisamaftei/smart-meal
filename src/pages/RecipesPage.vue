<template>
  <q-page-container class="newProductPage-container">
    <div class="q-pa-md row justify-center">
      <q-layout view="lHh Lpr lFf">
        <q-header>
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <img src="../assets/Logo.svg" />
            </div>
          </div>
        </q-header>
        <div class="page-title">Recipes</div>
        <q-btn @click="getRecipesCategories(mainIngredient)"></q-btn>
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section class="input-title"> Breakfast </q-item-section>

            <q-item-section side>
              <div class="row items-center input-title">Ingredients</div>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <div class="recipe-container">
                <div class="recipe-presentation">
                  <div class="recipe-name">Pancakes</div>
                  <img
                    class="recipe-img"
                    src="https://www.wholesomeyum.com/wp-content/uploads/2017/03/wholesomeyum-Low-Carb-Keto-Pancakes-Recipe-21.jpg"
                  />
                </div>
                <div class="recipe-ingredients">
                  <div class="ingredients-list">
                    milk, sugar, flour, baking powder, salt ...
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator color="secondary" inset />
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section class="input-title"> Brunch </q-item-section>

            <q-item-section side>
              <div class="row items-center input-title">Ingredients</div>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <div class="recipe-container">
                <div class="recipe-presentation">
                  <div class="recipe-name">Pancakes</div>
                  <img
                    class="recipe-img"
                    src="https://www.wholesomeyum.com/wp-content/uploads/2017/03/wholesomeyum-Low-Carb-Keto-Pancakes-Recipe-21.jpg"
                  />
                </div>
                <div class="recipe-ingredients">
                  <div class="ingredients-list">
                    milk, sugar, flour, baking powder, salt ...
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator color="secondary" inset />
      </q-layout>
    </div>
  </q-page-container>
</template>
<script>
import { useRecipesStore } from "../stores/recipesStore";
export default {
  setup() {
    const recipesStore = useRecipesStore();
    return { getRecipesCategories: recipesStore.getRecipesCategories };
  },
  data() {
    return {
      mainIngredient: "broccoli",
    };
  },
};
</script>

<style lang="scss" scoped>
.q-page-container {
  padding-top: 0 !important;
}
.page-title {
  color: #f78250;
  font-size: 2.5em;
  font-weight: 800;
  padding-top: 10vh;
}
.recipe-img {
  width: 50%;
}

.recipe-presentation {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  width: 50%;
}
.recipe-container {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  background-color: #9dd0e7;
  background-size: 200px 100px;
  border-radius: 8px;
  padding-bottom: 3%;
  padding-top: 3%;
}
.ingredients-list {
  width: 50%;
}
.recipe-ingredients {
  display: flex;
  justify-content: center;
  width: 50%;
}
.dropdown-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-title {
  color: #f78250;
  font-weight: 800;
}
.q-card__section {
  padding-top: 0px;
}
</style>
<style lang="scss">
.q-expansion-item .material-icons {
  color: #f78250;
}
</style>
