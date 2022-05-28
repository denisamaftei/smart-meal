<template>
  <q-page-container class="homePage-container">
    <div class="q-pa-md row justify-center">
      <q-layout view="lHh Lpr lFf">
        <q-header>
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <img src="../assets/Logo.svg" />
            </div>
          </div>
        </q-header>
        <div class="page-title">Your Fridge</div>
        <div class="fridge-container">
          <img class="fridge-svg" src="../assets/Fridge.svg" />
          <span class="freezer-container products-container">
            <q-btn class="products-btn" to="/category">
              <div>
                <img
                  class="frozenProd-svg"
                  src="../assets/FrozenProducts.svg"
                />
              </div>
              <div class="products-category">
                <div>Frozen</div>
                Products
              </div>
            </q-btn>
          </span>
          <span class="topLevel-container">
            <div class="products-container">
              <img src="../assets/Sweets.svg" />
              <div class="products-category">
                <div>Sweets</div>
                & Snacks
              </div>
            </div>
            <div class="products-container">
              <img src="../assets/MeatProducts.svg" />
              <div class="products-category">
                <div>Meat</div>
                Products
              </div>
            </div>
            <div class="products-container">
              <img src="../assets/Drinks.svg" />
              <div class="products-category">
                <div>Beverage</div>
                Products
              </div>
            </div>
          </span>
          <span class="middleLevel-container">
            <div class="products-container">
              <img src="../assets/Dairy.svg" />
              <div class="products-category">
                <div>Dairy</div>
                Products
              </div>
            </div>
            <div class="products-container">
              <img src="../assets/Bakery.svg" />
              <div class="products-category">
                <div>Bakery</div>
                Products
              </div>
            </div>
            <div class="products-container">
              <img src="../assets/Other.svg" />
              <div class="products-category other-category">
                <div>Other</div>
                Products
              </div>
            </div>
          </span>
          <span class="bottomLevel-container">
            <div class="products-container">
              <img src="../assets/Fruits.svg" />
              <div class="products-category">Fruits</div>
            </div>
            <div class="products-container">
              <img src="../assets/Vegetables.svg" />
              <div class="products-category">Vegetables</div>
            </div>
          </span>
        </div>
      </q-layout>
    </div>
  </q-page-container>
</template>
<script></script>
<style lang="scss" scoped>
.page-title {
  color: #f78250;
  font-size: 2.5em;
  font-weight: 800;
  width: 100%;
  padding-top: 10vh;
}
.q-page-container {
  padding-top: 0% !important;
  padding-bottom: 7% !important;
}

.q-pa-md {
  padding-bottom: 0;
}
.fridge-container {
  display: flex;
  justify-content: center;
  position: relative;
}
.fridge-svg {
  padding: 5%;
  z-index: -1;
  // width: 100%;
  // max-height: 20%;
}
.freezer-container {
  position: absolute;
  top: 17%;
  left: 42%;
}
.frozenProd-svg {
  z-index: 1;
}
.products-category {
  text-align: center;
}

.products-category {
  color: #533548;
}
.topLevel-container {
  position: absolute;
  top: 35%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}
.middleLevel-container {
  position: absolute;
  top: 57%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}
.bottomLevel-container {
  position: absolute;
  top: 80%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}
.products-container {
  text-align: center;
  .q-btn {
    all: unset;
  }
  .q-btn::before {
    box-shadow: none;
  }
}
.other-category {
  position: absolute;
  top: 55%;
}
</style>
