<template>
  <div class="q-pa-md row justify-center">
    <q-layout view="lHh Lpr lFf">
      <q-header>
        <div class="q-pa-md">
          <div class="q-gutter-md">
            <img src="../assets/Logo.svg" />
          </div>
        </div>
      </q-header>
      <div class="page-title">{{ this.selectedCategory }}</div>
      <div class="list-container">
        <div class="list-head">
          <div class="products-name">Name</div>
          <div>Expiration Date</div>
        </div>
        <div>
          <q-list class="list">
            <q-item
              v-for="product in productsData"
              :key="product.id"
              clickable
              v-ripple
              class="list-item"
            >
              <q-item-section class="product-name">{{
                product.name
              }}</q-item-section>
              <q-item-section>{{ product.expirationDate }}</q-item-section>
              <q-item-section
                @click="
                  handleDialog(product.name, product.category, product.id)
                "
                avatar
              >
                <q-icon color="black" name="disabled_by_default" />
              </q-item-section>
            </q-item>
            <q-dialog v-if="dialog" v-model="dialog" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <span class="q-ml-sm dialog"
                    >Are you sure you wanna delete
                    <span class="orange-text">{{ dialogName }} </span>
                    from your
                    <span class="orange-text">{{ dialogCategory }}</span
                    >?</span
                  >
                </q-card-section>

                <!-- Notice v-close-popup -->
                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn
                    flat
                    label="Delete"
                    @click="handleDelete(dialogId)"
                    color="secondary"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <!-- <q-item clickable v-ripple class="list-item">
              <q-item-section class="product-name">Chicken</q-item-section>
              <q-item-section>20/12/2021</q-item-section>
              <q-item-section @click="alert()" avatar>
                <q-icon color="black" name="disabled_by_default" />
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple class="list-item">
              <q-item-section class="product-name">Spinach</q-item-section>
              <q-item-section>20/12/2021</q-item-section>
              <q-item-section @click="alert()" avatar>
                <q-icon color="black" name="disabled_by_default" />
              </q-item-section>
            </q-item> -->
          </q-list>
        </div>
      </div>

      <q-footer>
        <div class="back-container">
          <q-btn round color="info" icon="arrow_back" to="/" />
          <span class="back-text">Back to your Fridge</span>
        </div>
      </q-footer>
    </q-layout>
  </div>
</template>
<script>
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import firebaseConfig from "../firebase";
import { ref } from "vue";

const db = firebaseConfig.db;

const dataForSetup = "";
let dialogName,
  dialogCategory,
  dialogId = "";
export default {
  data() {
    return {
      productsData: [],
      selectedCategory: "",
    };
  },
  setup() {
    // const splittedUrl = window.location.href.split("?=");
    // const selectedCategory = splittedUrl[1].replaceAll("%20", " ");
    // const $q = useQuasar();
    // // const test = "Fish";
    // const productToBeDeleted = dataForSetup;
    // const message =
    //   '<span class="dialog">Are you sure you wanna delete this?</span>';
    // function alert() {
    //   $q.dialog({
    //     title: "",
    //     message: message,
    //     style: "border-radius:10px;",
    //     align: "center",
    //     html: true,
    //     ok: {
    //       push: true,
    //       label: "delete",
    //     },
    //     cancel: {
    //       push: true,
    //       color: "negative",
    //     },
    //     persistent: true,
    //   })
    //     .onOk((id) => {
    //       db.collection("products")
    //         .doc(id)
    //         .delete()
    //         .then(() => {
    //           console.log("Document successfully deleted!");
    //         })
    //         .catch((error) => {
    //           console.error("Error removing document: ", error);
    //         });
    //     })
    //     .onCancel(() => {
    //       // console.log(">>>> Cancel");
    //     })
    //     .onDismiss(() => {
    //       // console.log("I am triggered on both OK and Cancel");
    //     });
    // }
    return { dialog: ref(false), cancelEnabled: ref(false) };
  },
  methods: {
    handleDialog(name, category, id) {
      this.dialog = true;
      this.dialogName = name;
      this.dialogCategory = category;
      this.dialogId = id;
      // console.log(this.dialogId);
    },
    handleDelete(id) {
      console.log(id);
      // this.productsData.splice(id, 1);
      let newArray = this.productsData.filter((item) => !(item.id === id));
      this.productsData = newArray;
      db.collection("products")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  mounted() {
    let url = "";

    url = this.$route.fullPath;
    console.log(url);
    let splittedUrl = "";
    // if (url.includes("?=")) {
    splittedUrl = url.split("?=");
    // } else {
    //   splittedUrl = url;
    // }

    if (splittedUrl[1]) {
      this.selectedCategory = splittedUrl[1].replaceAll("%20", " ");
    }
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data().category);
          console.log(this.selectedCategory);
          if (doc.data().category == this.selectedCategory) {
            this.productsData.push({
              id: doc.id,
              name: doc.data().name,
              expirationDate: doc.data().expirationDate,
              category: doc.data().category,
            });
            // console.log(doc.id, " => ", doc.data());
          }
        });
        return this.productsData;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },
};
</script>

<style scoped>
.q-header {
  background-color: #fff;
  /* box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%); */
}
.page-title {
  color: #f78250;
  font-size: 2.5em;
  font-weight: 800;
  padding-top: 10vh;
}
.list-head {
  display: flex;
  padding-left: 12%;
  color: #f78250;
  padding-top: 5%;
  /* justify-content: center; */
  /* margin-left: ; */
}
.list-item {
  background-color: #9dd0e7;
  width: 80%;
  border-radius: 10px;
  margin-top: 0.5vh;
}
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.products-name {
  margin-right: 23%;
}

.q-item__section--avatar {
  min-width: auto;
}
.q-footer {
  background-color: #fff;
  color: #000;
  padding: 5%;
}
.justify-end {
  justify-content: space-around !important;
}
.q-card > div {
  display: flex !important;
  flex-direction: row-reverse !important;
  justify-content: space-between !important;
}

.back-text {
  color: #f78250;
  font-weight: 900;
  padding-left: 2%;
}
</style>
<style lang="scss">
.orange-text {
  color: #f78250;
}
.dialog {
  font-family: customFont;
  // font-weight: 600;
  font-size: large;
  text-align: center;
}
</style>
