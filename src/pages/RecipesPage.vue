/* eslint-disable vue/no-ref-as-operand */
<template>
  <q-page-container class="newProductPage-container">
    <div class="q-pa-md row justify-center">
      <q-layout view="lHh Lpr lFf">
        <q-header>
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <SideMenu></SideMenu>

              <img src="../assets/Logo.svg" />
            </div>
          </div>
        </q-header>
        <div class="">
          <div class="sameRow-info">
            <div class="page-title">Recipes</div>

            <div class="filter">
              <q-select
                behavior="menu"
                class="filterOnDesktop"
                label="Select ingredient"
                v-model="model"
                use-input
                use-chips
                input-debounce="700"
                :options="filterOptions"
                @filter="filterFn"
                style="width: 100%"
              />
              <div class="filterOnMobile">
                <q-popup-proxy target=".filterOff">
                  <q-banner>
                    <q-select
                      behavior="menu"
                      label="Select ingredient"
                      v-model="model"
                      use-input
                      use-chips
                      input-debounce="700"
                      :options="filterOptions"
                      @filter="filterFn"
                      style="width: 100%"
                    />
                  </q-banner>
                </q-popup-proxy>
                <span class="filterOff">
                  <i class="filterIcon fa-solid fa-filter"> </i>
                  <div class="filter-text">Filter</div>
                </span>
              </div>
            </div>
          </div>
          <!-- <span style="color: #f99e77"> -->

          <!-- </span> -->
        </div>
        <div class="cards-container">
          <q-card v-for="recipe in recipes" :key="recipe.id">
            <a :href="recipe.sourceUrl" class="recipe-url">
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
            </a>
          </q-card>
        </div>
        <div v-if="!recipes.length" class="no-tasks">
          <q-icon
            name="fa-solid fa-magnifying-glass"
            size="100px"
            color="primary"
          >
          </q-icon>
          <div class="text-h5 text-primary text-center textOnMobile">
            Click on Filter and select your ingredient.
          </div>
          <div class="text-h5 text-primary text-center textOnDesktop">
            Type your ingredient first.
          </div>
        </div>
      </q-layout>
    </div>
  </q-page-container>
</template>
<script>
import { useRecipesStore } from "../stores/recipesStore";
import { ref } from "vue";
import firebaseConfig from "../firebase";
import SideMenu from "src/components/SideMenu.vue";
const db = firebaseConfig.db;

let productsData = [];
const recipesStore = useRecipesStore();
const model = ref(null);
const filterOptions = ref(productsData);
let checkForUserSelection = 1;
export default {
  components: { SideMenu },
  setup() {
    return {
      filterOptions,
      // getRecipes: recipesStore.getRecipes,
      getRecipesByIngredients: recipesStore.getRecipesByIngredients,
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
              if (productsData.includes(v) === false) {
                productsData.push(v);
              }
              if (modelValue.includes(v) === false) {
                modelValue.push(v);
              }
            });

          done(null);
          model.value = modelValue;
        }
      },

      filterFn(val, update) {
        update(() => {
          if (val === "") {
            filterOptions.value = productsData;
          } else {
            const needle = val.toLowerCase();

            filterOptions.value = productsData.filter(
              (v) => v.toLowerCase().indexOf(needle) > -1
            );
          }
          // eslint-disable-next-line vue/no-ref-as-operand
          // if (model._value != "") {
          //   // eslint-disable-next-line vue/no-ref-as-operand
          //   filterOn.value = true;
          // } else {
          //   filterOn.value = false;
          // }
        });
      },
    };
  },
  data() {
    // eslint-disable-next-line vue/no-ref-as-operand
    return {
      recipes: [],
      // eslint-disable-next-line vue/no-ref-as-operand
      filterOn: ref(false),
      model: ref(null),
    };
  },
  methods: {
    // async getRecipesInfo() {
    //   let response = this.getRecipes();
    //   this.recipes = await this.getRecipes();
    //   for (let i = 0; i < response.length; i++) {
    //     this.recipes = [
    //       { key: response[i].title, value: response[i].missedIngredients },
    //     ];
    //   }

    //   return this.recipes;
    // },
    async getRecipesBySelectedIngredients(userSelection) {
      // if (userSelection == null) {
      //   userSelection = "";
      // }
      if (userSelection) {
        this.recipes = "";
        this.recipes = await this.getRecipesByIngredients(
          userSelection.toString().toLowerCase()
        );
        return this.recipes;
      }
    },
    readProducts() {
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productsData.push(doc.data().name);
          });
          return productsData;
        })
        .catch((error) => {
        });
    },
    sendModelData(model) {
      // let newModel = "";
      // setTimeout(function () {
      //   newModel = model;
      // }, 2000);
      // if (model !== null) {
      //   this.getRecipesBySelectedIngredients(model);
      // }
    },
  },
  mounted() {
    let noIngredients = "";

  },
  beforeMount() {
    // this.getRecipesInfo();

    if (productsData.length == 0) {
      this.readProducts();
    }
    this.$watch(
      () => {
        return this.model;
      },
      (newVal, oldVal) => {
        this.getRecipesBySelectedIngredients(newVal);
      }
    );
  },
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
.filterOn {
  display: none;
  font-size: 30px;
  width: 100%;
  color: #f78250;
}
.q-gutter-md {
  display: flex;
  justify-content: space-between;
}
.q-card {
  box-shadow: none;
}
.recipe-url {
  text-decoration: none;
  color: #000;
  cursor: pointer;
}
.no-tasks {
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: inherit;
  margin-top: 20vh;
}
.filterOnDesktop,
.textOnDesktop {
  display: none;
}
.filterOnMobile,
.textOnMobile {
  display: initial;
}
.recipe-name {
  font-weight: bold;
}
@media only screen and (min-width: 768px) {
  .filterOff {
    cursor: pointer;
    font-size: 3vw;
  }
  .filterOnDesktop,
  .textOnDesktop {
    display: initial;
  }
  .filterOnMobile,
  .textOnMobile {
    display: none;
  }
  .ellipsis {
    font-weight: 900 !important;
  }
  .filter {
    width: 50%;
    margin-right: 1vw;
  }
  .recipe-img {
    // width: 25%;
  }
  .q-card {
    // margin-left: 2vw;
    // margin-right: 2vw;
    // min-width: 32vw;
    // max-width: 32vw;
    // min-height: 25vh;
    // max-height: 25vh;
    width: 50%;
    height: 100%;
  }
  .recipe-container {
    min-width: 80%;
    max-width: 80%;
  }
  .cards-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .q-card__section {
    display: flex;
    justify-content: center;
  }
}
</style>
<style lang="scss">
.q-expansion-item .material-icons {
  color: #f78250;
}
@media only screen and (min-width: 768px) {
  .ellipsis {
    font-weight: 900 !important;
  }
}
</style>
