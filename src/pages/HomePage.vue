<template>
  <q-page-container class="homePage-container">
    <div class="q-pa-md row justify-center">
      <!-- <q-layout view="lHh Lpr lFf"> -->
      <q-header>
        <div class="q-pa-md">
          <div class="q-gutter-md">
            <SideMenu></SideMenu>
            <img src="../assets/Logo.svg" />
          </div>
        </div>
      </q-header>

      <div class="page-title">Your Fridge</div>
      <div class="entire-fridge-container">
        <div class="fridge-container">
          <img class="fridge-svg" src="../assets/Fridge.svg" />
          <div class="categories-container">
            <span class="freezer-container products-container">
              <q-btn
                class="products-btn"
                @click="handleClick(categoriesData[3])"
              >
                <div>
                  <img
                    class="frozenProd-svg"
                    src="../assets/FrozenProducts.svg"
                  />
                </div>

                <div class="products-category">
                  {{ categoriesData[3] }}
                </div>
              </q-btn>
            </span>
            <span class="topLevel-container">
              <div
                class="products-container"
                @click="handleClick(categoriesData[4])"
              >
                <img src="../assets/Sweets.svg" />
                <div class="products-category">
                  {{ categoriesData[4] }}
                </div>
              </div>
              <div class="products-container">
                <img src="../assets/MeatProducts.svg" />
                <div
                  class="products-category"
                  @click="handleClick(categoriesData[6])"
                >
                  {{ categoriesData[6] }}
                </div>
              </div>
              <div class="products-container">
                <img src="../assets/Drinks.svg" />
                <div
                  class="products-category"
                  @click="handleClick(categoriesData[7])"
                >
                  {{ categoriesData[7] }}
                </div>
              </div>
            </span>
            <span class="middleLevel-container">
              <div class="products-container">
                <img src="../assets/Dairy.svg" />
                <div
                  class="products-category"
                  @click="handleClick(categoriesData[1])"
                >
                  {{ categoriesData[1] }}
                </div>
              </div>
              <div class="products-container">
                <img src="../assets/Bakery.svg" />
                <div
                  class="products-category"
                  @click="handleClick(categoriesData[0])"
                >
                  {{ categoriesData[0] }}
                </div>
              </div>
              <div class="products-container">
                <img src="../assets/Other.svg" />
                <div
                  class="products-category other-category"
                  @click="handleClick(categoriesData[5])"
                >
                  {{ categoriesData[5] }}
                </div>
              </div>
            </span>
            <span class="bottomLevel-container">
              <div class="products-container">
                <img src="../assets/Fruits.svg" />
                <div
                  class="products-category"
                  @click="handleClick(categoriesData[2])"
                >
                  {{ categoriesData[2] }}
                </div>
              </div>
              <div class="products-container">
                <img src="../assets/Vegetables.svg" />
                <div
                  class="products-category"
                  @click="handleClick(categoriesData[8])"
                >
                  {{ categoriesData[8] }}
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
      <!-- </q-layout> -->
    </div>
  </q-page-container>
</template>
<script>
import firebaseConfig from "../firebase";
import { ref } from "vue";
import SideMenu from "src/components/SideMenu.vue";
const db = firebaseConfig.db;
// import { useRouter } from "vue-router";
// const router = useRouter();
// let self = this;
// const authListener = firebaseConfig.projectAuth.onAuthStateChanged((user) => {
//   if (!user) {
//     // not logged in
//     router.push("/login");
//     console.log(user);

//     alert("you must be logged in to view this. redirecting to the home page");
//   } else {
//     console.log(user);
//   }
// });
export default {
  data() {
    return {
      categoryName: "",
      categoriesData: [],
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    readCategories() {
      db.collection("categories")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // this.categoriesData.push({
            //   id: doc.id,
            //   categoryName: doc.data().categoryName,
            // });
            this.categoriesData.push(doc.data().categoryName);
            // console.log(doc.id, " => ", doc.data());
          });
          return this.categoriesData;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    handleClick(e) {
      this.$router.push("/category?=" + e);
    },
  },
  beforeMount() {
    this.readCategories();
    console.log(this.categoriesData);
  },
  components: { SideMenu },
};
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.authRequired)) {
//     if (firebaseConfig.projectAuth().currentUser) {
//       next();
//     } else {
//       alert("You must be logged in to see this page");
//       next({
//         path: "/login",
//       });
//     }
//   } else {
//     next();
//   }
// });
</script>
<style lang="scss" scoped>
.page-title {
  color: #f78250;
  font-size: 2.5em;
  font-weight: 800;
  width: 100%;
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
  width: min-content;
  // min-width: 16vw; //only on mobile
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
  display: flex;
  align-items: center;
  flex-direction: column;
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
.q-layout {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.q-gutter-md {
  display: flex;
  justify-content: space-between;
}
@media only screen and (min-width: 768px) {
  // .fridge-container {
  //   width: 100%;
  // }
  // .fridge-svg {
  //   width: 30%;
  //   max-height: 20%;
  // }
  // .entire-fridge-container {
  //   width: 100%;
  // }
  // .categories-container {
  //   max-width: 100%;
  //   position: absolute;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   flex-direction: column;
  // }
  // .freezer-container,
  // .topLevel-container,
  // .middleLevel-container,
  // .bottomLevel-container {
  //   position: initial;
  //   top: 0;
  //   left: 0;
  // }
  // .other-category {
  //   position: initial;
  // }
  // .products-category {
  //   min-width: 6vw;
  // }
}
</style>
