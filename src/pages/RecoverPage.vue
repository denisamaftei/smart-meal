<template>
  <q-page-container class="login-container">
    <div class="q-pa-md row justify-center">
      <div class="login-info">
        <div class="login-messages">
          <div class="signIn-message">Recover your password</div>
        </div>
        <div class="login-inputs">
          <SimpleInput class="email-input"></SimpleInput>
          <PasswordInput></PasswordInput>
          <PasswordInput label="New Password"></PasswordInput>
          <PasswordInput label="Confirm New Password"></PasswordInput>
        </div>
        <div class="buttons-container">
          <ConnectButton label="Change password"></ConnectButton>
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
import PasswordInput from "../components/PasswordInput.vue";
import ConnectButton from "../components/ConnectButton.vue";
export default {
  components: { SimpleInput, PasswordInput, ConnectButton },
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
</style>
