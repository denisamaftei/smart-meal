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
          <SimpleInput v-model="form.email"></SimpleInput>
          <PasswordInput v-model="form.password"></PasswordInput>
        </div>
        <div class="buttons-container">
          <ConnectButton label="Continue" @click="submit()"></ConnectButton>
          <div class="termsAndPolicy-container">
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
          </div>

          <div class="account">
            <q-btn class="account-btn backToSignIn" to="/login"
              ><span class="account-question">Have an account?</span> Sign
              in.</q-btn
            >
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="termsAlert">
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
    </q-dialog>
  </q-page-container>
</template>
<script>
import SimpleInput from "../components/SimpleInput.vue";
import PasswordInput from "../components/PasswordInput.vue";
import ConnectButton from "../components/ConnectButton.vue";
import { ref } from "vue";
import firebaseConfig from "../firebase";

export default {
  components: { SimpleInput, PasswordInput, ConnectButton },
  setup() {
    return {
      customModel: ref("no"),
      termsAlert: ref(false),
      policyAlert: ref(false),
    };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      console.log("submit");
      firebaseConfig.projectAuth
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          console.log("Successfully registered!");
          this.$router.push("Login");
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
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

.q-btn:before {
  box-shadow: none;
}
.q-btn--actionable.q-btn--standard:before {
  transition: none;
}
.account-question {
  color: rgba(0, 0, 0, 0.55);
  margin-right: 1vw;
}
</style>
