<template>
  <q-page-container class="expiringProductsPage-container">
    <div class="q-pa-md row justify-center">
      <q-layout view="lHh Lpr lFf">
        <q-header>
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <img src="../assets/Logo.svg" />
            </div>
          </div>
        </q-header>
        <div class="page-title">Expiring Soon</div>
        <q-table
          class="expiring-table"
          :rows="productsData"
          row-key="name"
          :virtual-scroll-item-size="48"
          :virtual-scroll-sticky-size-start="48"
          :pagination="pagination"
          :rows-per-page-options="[0]"
          @virtual-scroll="onScroll"
          hide-pagination
        />
      </q-layout>
    </div>
  </q-page-container>
</template>
<script>
import firebaseConfig from "../firebase";
const db = firebaseConfig.db;

export default {
  data() {
    return {
      productsData: [],
    };
  },
  setup() {
    let frozenProdSVG = (
      <span style="color:#f99e77">
        <i class="fa-solid fa-ice-cream"></i>
      </span>
    );
    let sweetsProdSVG = (
      <span style="color:#f99e77">
        <i class="fa-solid fa-cake-candles"></i>
      </span>
    );
    let meatProdSVG = (
      <span style="color:#f99e77">
        <i class="fa-solid fa-drumstick"></i>
      </span>
    );
    let bakeryProdSVG = (
      <span style="color:#f99e77">
        <i class="fa-solid fa-bread-slice"></i>
      </span>
    );
    let dairyProdSVG = (
      <span style="color:#f99e77">
        <i class="fa-solid fa-cheese"></i>
      </span>
    );
    let beveragesProdSVG = (
      <span style="color:#f99e77">
        <i class="fa-solid fa-wine-bottle"></i>
      </span>
    );
    let otherProdSVG = (
      <span style="color:#f99e77">
        <i class="fa-solid fa-pizza-slice"></i>
      </span>
    );
    let fruitsProdSVG = (
      <span style="color:#f99e77">
        <i class="fa-solid fa-apple-whole"></i>
      </span>
    );
    let vegetablesProdSVG = (
      <span style="color:#f99e77">
        <i class="fa-solid fa-carrot"></i>
      </span>
    );
    return {
      frozenProdSVG,
      sweetsProdSVG,
      meatProdSVG,
      bakeryProdSVG,
      dairyProdSVG,
      beveragesProdSVG,
      otherProdSVG,
      fruitsProdSVG,
      vegetablesProdSVG,
    };
  },
  methods: {
    readProducts() {
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.productsData.push({
              name: doc.data().name,
              category: doc.data().category,
              expirationDate: doc.data().expirationDate,
            });
            // console.log(doc.id, " => ", doc.data());
          });
          this.productsData.forEach((prod) => {
            switch (prod.category) {
              case "Frozen Products":
                prod.category = this.frozenProdSVG;
                break;
              case "Sweets & Snacks":
                prod.category = this.sweetsProdSVG;
                break;
              case "Meat Products":
                prod.category = this.meatProdSVG;
                break;
              case "Beverage Products":
                prod.category = this.beveragesProdSVG;
                break;
              case "Dairy Products":
                prod.category = this.dairyProdSVG;
                break;
              case "Bakery Products":
                prod.category = this.bakeryProdSVG;
                break;
              case "Other Products":
                prod.category = this.otherProdSVG;
                break;
              case "Fruits":
                prod.category = this.fruitsProdSVG;
                break;
              case "Vegetables":
                prod.category = this.vegetablesProdSVG;
                break;
              default:
                break;
            }
          });
          return this.productsData;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
  },
  beforeMount() {
    this.readProducts();
    console.log(this.productsData);
  },
};
</script>
<style lang="scss" scoped>
.page-title {
  color: #f78250;
  font-size: 2.5em;
  font-weight: 800;
  padding-top: 10vh;
}
.q-table__container {
  margin-left: 5%;
  margin-right: 5%;
  border-color: transparent;
  box-shadow: none;
}
</style>
<style>
.q-table thead {
  color: #f78250;
  font-weight: 900;
}
.q-table th {
  padding: 0%;
}
.text-left {
  text-align: center;
}
.q-table td {
  padding: 0;
}
</style>
