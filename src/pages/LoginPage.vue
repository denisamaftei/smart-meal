<template>
  <q-page-container class="login-container">
    <div class="q-pa-md row justify-center">
      <div class="login-info">
        <div class="login-messages">
          <div class="signIn-message">Sign in</div>
          <div class="welcome-message">Hi, there! Nice to see you again.</div>
        </div>
        <div class="login-inputs">
          <SimpleInput
            :rules="[
              (val) =>
                (val &&
                  val.length > 0 &&
                  val.match(
                    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
                  )) ||
                'You must enter a valid email',
            ]"
            v-model="form.email"
          ></SimpleInput>
          <PasswordInput
            :rules="[(val) => (val && val.length >= 6) || 'Incorrect password']"
            v-model="form.password"
          ></PasswordInput>
        </div>
        <div class="buttons-container">
          <ConnectButton @click="signIn()"></ConnectButton>
          <div class="socialProfile-message">
            or use one of your social profile
          </div>
          <div class="socialProfile-buttons">
            <q-btn
              color="red-7"
              label="Google"
              class="google-btn"
              to="https://accounts.google.com/login"
            >
              <img class="google-icon" src="../assets/Google.svg" />
            </q-btn>
            <q-btn
              color="blue-8"
              label="Facebook"
              class="facebook-btn"
              to="https://www.facebook.com/login/"
            >
              <img class="facebook-icon" src="../assets/Facebook.svg" />
            </q-btn>
          </div>
          <div class="account">
            <q-btn class="account-btn recover-password" to="/recoverPass"
              >Forgot password?</q-btn
            >
            <q-btn class="account-btn register-btn" to="/register"
              >Sign up</q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </q-page-container>
</template>
<script>
import SimpleInput from "../components/SimpleInput.vue";
import PasswordInput from "../components/PasswordInput.vue";
import ConnectButton from "../components/ConnectButton.vue";
import { ref } from "vue";
import firebaseConfig from "../firebase";
import { useQuasar } from "quasar";

const passwordError = "";
const emailError = "";
const errMsg = ref();

export default {
  components: { SimpleInput, PasswordInput, ConnectButton },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      triggerNegative() {
        $q.notify({
          type: "negative",
          message: "Email or password incorrect.",
        });
      },
    };
  },
  methods: {
    signIn() {
      console.log("signIn");
      firebaseConfig.projectAuth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          console.log("Successfully LoggedIn!");
          this.$router.push("/");
          console.log(firebaseConfig.projectAuth.currentUser);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              errMsg.value = "Invalid email";
              this.triggerNegative();
              break;
            case "auth/user-not-found":
              errMsg.value = "No account with that email was found";
              this.triggerNegative();
              break;
            case "auth/wrong-password":
              errMsg.value = "Incorrect password";
              this.triggerNegative();
              break;
            default:
              errMsg.value = "Email or password was incorrect";
              this.triggerNegative();
              break;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  padding-top: 0px !important;
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
.welcome-message {
  color: rgba(0, 0, 0, 0.55);
}

.buttons-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 3vh;
}
.socialProfile-message {
  display: flex;
  justify-content: center;
  padding: 2vh 0vh 2vh 0vh;
  color: rgba(0, 0, 0, 0.55);
}
.socialProfile-buttons {
  display: flex;
  justify-content: space-between;
}
.recover-password {
  padding-left: 0px;
}
.register-btn {
  padding-right: 0px;
}
.account {
  display: flex;
  justify-content: space-between;
  margin-top: 7vh;
  color: #257394;
}
.google-icon,
.facebook-icon {
  order: -1;
  margin-right: 3vw;
}
.facebook-btn {
  margin-left: 10vw;
}
.google-btn,
.facebook-btn {
  width: 32vw;
}
</style>
