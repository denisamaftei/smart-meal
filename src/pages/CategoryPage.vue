<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <img src="../assets/Logo.svg" />
        </div>
      </div>
    </q-header>
    <div class="page-title">Frozen Products</div>
    <div class="list-container">
      <div class="list-head">
        <div class="products-name">Name</div>
        <div>Expiration Date</div>
      </div>
      <div>
        <q-list class="list">
          <q-item clickable v-ripple class="list-item">
            <q-item-section class="product-name">Fish</q-item-section>
            <q-item-section>20/12/2021</q-item-section>
            <q-item-section @click="alert()" avatar>
              <q-icon color="black" name="disabled_by_default" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple class="list-item">
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
          </q-item>
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
</template>
<script>
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    // const test = "Fish";
    // const fish = <div>test</div>;
    const message =
      "Are you sure you wanna delete Fish " +
      // + fish +
      " from your Frozen Products?";
    function alert() {
      $q.dialog({
        title: "",
        message: message,
        style: "border-radius:10px;",
        align: "center",

        ok: {
          push: true,
          label: "delete",
        },
        cancel: {
          push: true,
          color: "negative",
        },
        persistent: true,
      })
        .onOk(() => {
          console.log(">>>> OK");
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel");
        });
    }
    return { alert };
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
  margin-top: 20%;
  padding-left: 16px;
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
