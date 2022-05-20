<template>
  <q-page-container class="newProductPage-container">
    <div class="q-pa-md row justify-center">
      <q-layout view="lHh Lpr lFf">
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
        <div class="input-title">Category</div>
        <q-select
          class="product-input"
          bg-color="info"
          clearable
          v-model="model"
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

        <div class="add-container">
          <q-btn class="done-btn" round color="info" icon="check" to="/" />
          <span class="add-text">Done!</span>
        </div>
      </q-layout>
    </div>
  </q-page-container>
</template>
<script>
import SimpleInput from "../components/SimpleInput.vue";
import { ref } from "vue";
export default {
  components: { SimpleInput },
  data() {
    return {
      name: "",
      date: "",
      model: ref(null),
      options: [
        { label: "Google", value: "Google", icon: "mail" },
        { label: "Google", value: "Google", icon: "mail" },
        { label: "Google", value: "Google", icon: "mail" },
        { label: "Google", value: "Google", icon: "mail" },
        { label: "Google", value: "Google", icon: "mail" },
      ],
    };
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
  padding-left: 16px;
  // padding-bottom: 7%;
}
.q-page-container {
  padding-top: 0 !important;
}
.input-title {
  color: #f78250;
  padding-top: 10%;
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
  padding-top: 15%;
}
.q-icon,
.material-icons,
.q-select__dropdown-icon {
  color: #f99e77;
}
.q-field__native,
.q-field__input {
  color: #f99e77 !important;
}
.done-btn {
  font-size: 1.2em;
}
</style>
<style lang="scss">
.q-field--filled .q-field__control {
  border-radius: 25px !important;
}
.q-field--filled.q-field--highlighted .q-field__control:after {
  margin-left: 7% !important;
  margin-right: 7% !important;
}
</style>
