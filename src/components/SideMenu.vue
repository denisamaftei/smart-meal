<template>
  <q-btn
    class="menu-item"
    flat
    round
    icon="menu"
    color="primary"
    @click="toggleLeftDrawer"
  />
  <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" elevated>
    <q-banner rounded>
      <template v-slot:avatar>
        <img class="profile-banner" src="../assets/Food.svg" />
      </template>
    </q-banner>
    <div class="user-info">
      <q-avatar class="user-avatar" color="accent" text-color="white"
        >J</q-avatar
      >
      <div class="user-info-details user-name">Johnny Doe</div>
      <div class="user-info-details user-mail">johnny@doe.com</div>
    </div>
    <div class="menu-options">
      <div class="icon-text">
        <q-icon class="fas fa-cog icons" color="primary" />
        <div class="panel-text">Settings</div>
      </div>
      <q-separator color="secondary" />
      <div class="icon-text">
        <q-icon class="fas fa-question icons" color="primary" />
        <div class="panel-text">Help</div>
      </div>
      <q-separator color="secondary" />
      <div class="icon-text">
        <q-icon class="fas fa-lock icons" color="primary" />
        <div class="panel-text">Terms of Services</div>
      </div>
      <q-separator color="secondary" />
      <div class="icon-text">
        <q-icon class="fas fa-user-secret icons" color="primary" />
        <div class="panel-text">Privacy Policy</div>
      </div>
      <q-separator color="secondary" />
      <div class="icon-text">
        <q-icon class="fas fa-info icons" color="primary" />
        <div class="panel-text">About the application</div>
      </div>
      <q-separator color="secondary" />
      <div class="icon-text log-out" @click="logout()">
        <q-icon class="fas fa-sign-out-alt icons" color="primary" />

        <div class="panel-text">Sign out</div>
      </div>
    </div>
  </q-drawer>
</template>
<script>
import { ref } from "vue";
import firebaseConfig from "../firebase";

const isLoggedIn = ref(true);
firebaseConfig.projectAuth.onAuthStateChanged(function (user) {
  if (user) {
    isLoggedIn.value = true; // if we have a user
  } else {
    isLoggedIn.value = false; // if we do not
  }
});

export default {
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
    logout() {
      console.log("logout");
      firebaseConfig.projectAuth
        .signOut()
        .then(() => {
          console.log(firebaseConfig.projectAuth.currentUser);
          this.$router.push("/Login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-text {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2vh 0 2vh 5vw;
}
.icons,
.panel-text {
  display: inline;
}

.icons {
  // padding-top: 0.2vh;
  margin-right: 2vw;
  font-size: 7vw;
}
.panel-text {
  font-size: 100%;
  color: #000;
}
.profile-banner {
  opacity: 0.25;
  object-fit: cover;
  max-height: 30vh;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
  background-color: #257394;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 5%;
  width: 100%;
  color: #000;
}
.user-info-details {
  margin-top: 1vh;
  font-size: 5vw;
}
.q-banner {
  padding: 0;
  width: 100%;
}
.menu-options {
  margin-left: 8vw;
  margin-right: 8vw;
}
</style>
<style lang="scss">
.q-banner__avatar {
  width: 100% !important;
}
</style>
