<template>
  <q-page-container class="login-container">
    <div class="q-pa-md row justify-center">
      <div class="login-info">
        <div class="login-messages">
          <div class="signIn-message">Recover your password</div>
        </div>
        <div class="login-inputs">
          <SimpleInput v-model="form.email" class="email-input"></SimpleInput>
        </div>
        <div class="buttons-container">
          <ConnectButton
            @click="submit()"
            label="Reset your password"
          ></ConnectButton>
          <div class="account">
            <q-btn class="account-btn back-btn" to="/login"
              >Back to sign in.</q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </q-page-container>
</template>
<script>
import SimpleInput from "../components/SimpleInput.vue";
import ConnectButton from "../components/ConnectButton.vue";
import firebaseConfig from "../firebase";
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    return {
      triggerNegative() {
        $q.notify({
          type: "negative",
          message: "No account with that email was found",
        });
      },
    };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: false,
      emailSending: false,
    };
  },
  components: { SimpleInput, ConnectButton },
  methods: {
    submit() {
      // if (!this.email) {
      //   this.triggerNegative();
      // }
      firebaseConfig.projectAuth
        .sendPasswordResetEmail(this.form.email)
        .then((data) => {
          this.emailSending = false;
          this.$router.push("Login");
        })
        .catch((err) => {
          this.emailSending = false;
          this.triggerNegative();

          this.error = true;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  padding-top: 0px !important;
  font-family: "Times New Roman", Times, serif;
}
.q-btn {
  text-transform: none;
  border-radius: 10px;
}
.account-btn:before {
  position: initial;
  font-weight: 400;
}
.signIn-message {
  color: #f78250;
  font-size: 2em;
}

.buttons-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 3vh;
}

.recover-password {
  padding-left: 0px;
}
.back-btn {
  padding-right: 0;
  padding-left: 0;
}
.account {
  display: flex;
  justify-content: center;
  margin-top: 7vh;
  color: #257394;
}
.q-field--with-bottom {
  padding-bottom: 0px;
}
.login-info {
  padding-top: 10vh;
}
</style>
