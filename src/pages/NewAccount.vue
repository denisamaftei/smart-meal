<template>
  <q-page-container class="login-container">
    <q-dialog v-model="termsAlert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md row justify-center">
      <div class="login-info">
        <div class="login-messages">
          <div class="signUp-message">Create your account</div>
        </div>
        <div class="login-inputs">
          <SimpleInput v-model="form.email" ref="emailInput"></SimpleInput>

          <PasswordInput
            :rules="[
              (val) =>
                (val && val.length >= 6) ||
                'Password must have at least 6 characters',
            ]"
            v-model="form.password"
          ></PasswordInput>
        </div>
        <div class="buttons-container">
          <ConnectButton label="Sign up" @click="submit()"></ConnectButton>
          <!-- <div class="socialProfile-message">or use your Google account</div> -->
          <div class="socialProfile-buttons">
            <q-btn
              color="red-7"
              label="Sign up with Google"
              class="google-btn"
              @click="googleSignIn()"
            >
              <img class="google-icon" src="../assets/Google.svg" />
            </q-btn>
            <!-- <q-btn
              color="blue-8"
              label="Facebook"
              class="facebook-btn"
              @click="facebookSignIn()"
            >
              <img class="facebook-icon" src="../assets/Facebook.svg" />
            </q-btn> -->
          </div>
          <!-- <div class="termsAndPolicy-container">
            <q-checkbox
              v-model="customModel"
              color="secondary"
              true-value="yes"
              false-value="no"
              class="termsAndPolicy-checkbox"
            />
            I agree to the
            <q-btn
              class="termsAndPolicy-btn termsAndPolicy"
              @click="termsAlert = true"
              >Terms of Services</q-btn
            ><br />
            and
            <q-btn
              class="termsAndPolicy-btn termsAndPolicy"
              @click="policyAlert = true"
              >Privacy Policy</q-btn
            >.
          </div> -->

          <div class="account">
            <q-btn class="account-btn backToSignIn" to="/login"
              ><span class="account-question">Have an account?</span> Sign
              in.</q-btn
            >
          </div>
        </div>
      </div>
    </div>
    <!-- <q-dialog v-model="termsAlert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms and Services</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="policyAlert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Privacy Policy</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
  </q-page-container>
</template>
<script>
import SimpleInput from "../components/SimpleInput.vue";
import PasswordInput from "../components/PasswordInput.vue";
import ConnectButton from "../components/ConnectButton.vue";
import { ref } from "vue";
import firebaseConfig from "../firebase";
import { useQuasar } from "quasar";
import firebase from "firebase/compat/app";

export default {
  components: { SimpleInput, PasswordInput, ConnectButton },
  setup() {
    const $q = useQuasar();
    return {
      customModel: ref("no"),
      termsAlert: ref(false),
      policyAlert: ref(false),
      triggerNegative() {
        $q.notify({
          type: "negative",
          message: "Please check again the info you provided.",
        });
      },
    };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: "",
      },
      error: false,
    };
  },
  methods: {
    submit() {
      if (this.form.email && this.form.password && this.form.name) {
        firebaseConfig.projectAuth
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((data) => {
            this.$router.push("Login");
          })
          .catch((err) => {
            this.error = true;
          });
      } else {
        this.triggerNegative();
      }
    },
    googleSignIn() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          this.$router.push("Login");
        })
        .catch((err) => {});
    },
    facebookSignIn() {
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          this.$router.push("/");
        })
        .catch((err) => {});
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
.signUp-message {
  color: #f78250;
  font-size: 2em;
}
.buttons-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 3vh;
}
.backToSignIn {
  padding-left: 0px;
}
.register-btn {
  padding-right: 0px;
}
.account {
  display: flex;
  justify-content: center;
  margin-top: 7vh;
  color: #257394;
}

.termsAndPolicy-container {
  margin-top: 3vh;
}
.termsAndPolicy {
  color: #257394;
  cursor: pointer;
}

.termsAndPolicy-btn {
  padding: 0;
  padding-bottom: 0.2vh;
}

.q-btn--actionable.q-btn--standard:before {
  transition: none;
}
.account-question {
  color: rgba(0, 0, 0, 0.55);
  margin-right: 1vw;
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
  margin-top: 2vh;
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
  width: 100%;
}
@media only screen and (min-width: 768px) {
  .google-icon {
    margin-right: 1vw;
  }
}
</style>
