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
        <div class="page-title">Add Product</div>
        <div class="inputs-container">
          <div class="input-title">Product Name</div>
          <SimpleInput
            class="product-input"
            bg-color="info"
            v-model="name"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'You must enter a product name',
            ]"
            filled
            label=""
            label-color="orange"
          ></SimpleInput>
        </div>
        <div class="input-title">Category</div>
        <q-select
          behavior="menu"
          transition-show="fade"
          class="product-input"
          bg-color="info"
          clearable
          v-model="category"
          filled
          :options="options"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <div class="input-title">Expiration Date</div>

        <q-input
          class="product-input"
          label-color="orange"
          bg-color="info"
          v-model="date"
          type="date"
          stack-label
          filled
        />

        <div class="add-container">
          <q-btn
            class="done-btn"
            @click="createProduct(this.name, this.date, this.category.value)"
            color="primary"
            round
            icon="check"
            to="/"
          />
        </div>
      </q-layout>
    </div>
  </q-page-container>
</template>
<script>
import SimpleInput from "../components/SimpleInput.vue";
import { ref } from "vue";
import firebaseConfig from "../firebase";
import { uuid } from "vue-uuid";
// const db = firebas;

const db = firebaseConfig.db;
let productsCollection = db.collection("products");
export default {
  components: { SimpleInput },
  data() {
    return {
      name: "",
      date: "",
      category: ref(null),
      productsData: [],
      options: [
        {
          label: "Frozen Products",
          value: "Frozen Products",
          icon: "fa-solid fa-ice-cream",
        },
        {
          label: "Sweets & Snacks",
          value: "Sweets & Snacks",
          icon: "fa-solid fa-cake-candles",
        },
        {
          label: "Meat Products",
          value: "Meat Products",
          icon: "fa-solid fa-drumstick-bite",
        },
        {
          label: "Beverage Products",
          value: "Beverage Products",
          icon: "fa-solid fa-wine-bottle",
        },
        {
          label: "Dairy Products",
          value: "Dairy Products",
          icon: "fa-solid fa-cheese",
        },
        {
          label: "Bakery Products",
          value: "Bakery Products",
          icon: "fa-solid fa-bread-slice",
        },

        { label: "Fruits", value: "Fruits", icon: "fa-solid fa-apple-whole" },
        {
          label: "Vegetables",
          value: "Vegetables",
          icon: "fa-solid fa-carrot",
        },
        {
          label: "Other Products",
          value: "Other Products",
          icon: "fa-solid fa-pizza-slice",
        },
      ],
    };
  },
  methods: {
    readCategories() {
      db.collection("categories")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.productsData.push({
              id: doc.uid,
              categoryName: doc.data().categoryName,
            });
            console.log(doc.id, " => ", doc.data());
          });
          return this.productsData;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    createProduct(name, expirationDate, category) {
      let splittedDate = expirationDate.split("-"); //[2022, 06, 10]
      //swapping day and year
      let year = splittedDate[0];
      splittedDate[0] = splittedDate[2];
      splittedDate[2] = year;
      //[10, 06, 2022]
      // splittedDate.splice(1, 0, "-"); // [10, - , 06, 2022]
      // splittedDate.splice(3, 0, "-"); // [10, - , 06, - , 2022]
      let finalDate = splittedDate.join("-");
      db.collection("products")
        .add({
          expirationDate: finalDate,
          name: name,
          category: category,
          uid: uuid.v1(),
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
  },
  beforeMount() {
    this.readCategories();
  },
};
</script>
<style lang="scss" scoped>
.q-layout {
  min-height: 0 !important;
}
.page-title {
  color: #f78250;
  font-size: 2.5em;
  font-weight: 800;
  padding-top: 10vh;
}
.q-page-container {
  padding-top: 0 !important;
}
.input-title {
  color: #f78250;
  padding-top: 7%;
}
.q-field {
  padding-bottom: 0;
}
.add-text {
  color: #f78250;
  font-weight: 900;
  padding-top: 5%;
  font-size: 1.2em;
}
.add-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 10%;
}
.q-icon,
.material-icons,
.q-select__dropdown-icon {
  color: #f99e77;
}
.q-field__native,
.q-field__input {
  color: #f99e77;
}
.done-btn {
  font-size: 1.2em;
  // border-radius: 10px;
}
.q-item {
  min-height: min-content !important;
  padding-top: 1vh !important;
  padding-bottom: 0 !important;
  font-family: customFont;
}
</style>
<style lang="scss">
.q-field--filled .q-field__control {
  border-radius: 10px !important;
}
.q-field--filled.q-field--highlighted .q-field__control:after {
  margin-left: 7% !important;
  margin-right: 7% !important;
}
.popupContentClass {
  height: 10%;
}
.q-item__label {
  margin-top: 1vh;
}
.q-position-engine {
  max-height: 30% !important;
}
</style>
