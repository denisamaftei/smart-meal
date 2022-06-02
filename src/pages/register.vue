<template>
  <div>
    <template v-if="tab === 'register'">
      <div class="text-center q-mb-lg">Sign up with</div>
    </template>
    <template v-else>
      <div class="text-center q-mb-lg">Sign in with</div>
    </template>
    <div class="flex flex-center">
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        color="primary"
        size="md"
        label="Google"
        @click="google"
      />
    </div>
    <template v-if="tab === 'register'">
      <p class="text-center">Sign up with credentials</p>
    </template>
    <template v-else>
      <p class="text-center">Sign in with credentials</p>
    </template>

    <q-form @submit="submitForm">
      <q-input
        outlined
        class="q-mb-md"
        type="email"
        label="Email"
        v-model="formData.email"
      />
      <q-input
        outlined
        class="q-mb-md"
        type="password"
        label="Password"
        v-model="formData.password"
      />
      <div class="row">
        <q-space />
        <q-btn type="submit" color="primary" :label="tab" />
      </div>
    </q-form>
    <div class="text-center q-my-md">
      <q-btn
        flat
        label="Forgot Password?"
        color="green"
        class="text-capitalize rounded-borders"
        v-if="tab !== 'register'"
        @click="forgotPassword"
      />
    </div>
    <q-dialog v-model="resetPwdDialog">
      <ForgotPassword />
    </q-dialog>
  </div>
</template>
<script>
import ForgotPassword from "./ForgotPassword.vue";
export default {
  name: "AuthComponent",
  props: ["tab"],
  components: { ForgotPassword },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      resetPwdDialog: false,
    };
  },
  methods: {
    submitForm() {
      if (this.tab === "login") {
        this.signInExistingUser(this.formData.email, this.formData.password);
      } else {
        this.createUser(this.formData.email, this.formData.password);
      }
    },
    google() {
      console.log("google login & signup");
    },
    signInExistingUser(email, password) {
      console.log(email, password);
    },
    createUser(email, password) {
      console.log(email, password);
    },
    forgotPassword() {
      this.resetPwdDialog = true;
    },
  },
};
</script>
