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
        <div class="">
          <div class="sameRow-info">
            <div class="page-title">Recipes</div>

            <div class="filter">
              <i v-if="!filterOn" class="filterIcon fa-solid fa-filter"> </i>
              <div v-if="!filterOn" class="filter-text">Filter</div>
              <i
                v-if="filterOn"
                class="filterIcon fa-solid fa-filter-circle-xmark"
              ></i>
              <div v-if="filterOn" class="filter-text">Clear filter</div>
              <q-popup-proxy :target="filter">
                <q-banner>
                  <q-select
                    behavior="menu"
                    label="Select ingredients"
                    v-model="model"
                    use-input
                    use-chips
                    multiple
                    input-debounce="0"
                    @new-value="createValue"
                    :options="filterOptions"
                    @filter="filterFn"
                    style="width: 100%"
                  />
                </q-banner>
              </q-popup-proxy>
            </div>
          </div>
          <!-- <span style="color: #f99e77"> -->

          <!-- </span> -->
        </div>
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section class="input-title"> Breakfast </q-item-section>

            <q-item-section side>
              <div class="row items-center input-title">Ingredients</div>
            </q-item-section>
          </template>

          <q-card v-for="recipe in recipes" :key="recipe.id">
            <q-card-section>
              <div class="recipe-container">
                <div class="recipe-presentation">
                  <div class="recipe-name">
                    {{ recipe.title }}
                  </div>
                  <img class="recipe-img" :src="recipe.image" />
                </div>
                <div class="recipe-ingredients">
                  <span
                    v-for="ingredient in recipe.missedIngredients.slice(0, 5)"
                    :key="ingredient.id"
                    class="ingredients-list"
                  >
                    {{ ingredient.name }},
                  </span>
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
        </q-expansion-item>
        <q-separator color="secondary" inset />
      </q-layout>
    </div>
  </q-page-container>
</template>
<script>
import { useRecipesStore } from "../stores/recipesStore";
import { ref } from "vue";

const recipesStore = useRecipesStore();
const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
export default {
  setup() {
    const model = ref(null);
    const filterOptions = ref(stringOptions);
    return {
      model,
      filterOptions,
      getRecipes: recipesStore.getRecipes,
      createValue(val, done) {
        // Calling done(var) when new-value-mode is not set or is "add", or done(var, "add") adds "var" content to the model
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
        // only if is not already set and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
        // (adds to model if not already in the model, removes from model if already has it)
        // and it resets the input textbox to empty string
        // ----
        // If "var" content is undefined/null, then it doesn't tampers with the model
        // and only resets the input textbox to empty string

        if (val.length > 0) {
          const modelValue = (model.value || []).slice();

          val
            .split(/[,;|]+/)
            .map((v) => v.trim())
            .filter((v) => v.length > 0)
            .forEach((v) => {
              if (stringOptions.includes(v) === false) {
                stringOptions.push(v);
              }
              if (modelValue.includes(v) === false) {
                modelValue.push(v);
              }
            });
          console.log(modelValue);

          done(null);
          model.value = modelValue;
        }
        if (model.value) {
          this.filterOn = true;
        }
      },

      filterFn(val, update) {
        update(() => {
          if (val === "") {
            filterOptions.value = stringOptions;
          } else {
            const needle = val.toLowerCase();

            filterOptions.value = stringOptions.filter(
              (v) => v.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      },
    };
  },
  data() {
    return {
      recipes: [],
      filterOn: false,
    };
  },
  methods: {
    async getRecipesInfo() {
      this.recipes = await this.getRecipes();
      return this.recipes;
    },
  },
  // beforeMount() {
  //   this.getRecipesInfo();
  // },
};
</script>

<style lang="scss" scoped>
.q-page-container {
  padding-top: 0 !important;
}
.sameRow-info {
  color: #f78250;
  font-size: 2.5em;
  font-weight: 800;
  padding-top: 10vh;
  // width: min-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  // width: 50%;
}
.recipe-ingredients {
  // display: flex;
  // justify-content: center;
  width: 35%;
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
.recipe-name {
  text-align: center;
}
.page-title {
  width: 50%;
}
.filterIcon {
  font-size: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.filter {
  display: flex;
  align-items: center;
}
.filter-text {
  font-size: 50%;
  margin-left: 1vw;
}
.q-banner {
  min-width: 100%;
}
</style>
<style lang="scss">
.q-expansion-item .material-icons {
  color: #f78250;
}
</style>
