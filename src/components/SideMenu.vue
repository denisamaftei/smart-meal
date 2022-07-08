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
    <q-banner class="avatar-banner" rounded>
      <template v-slot:avatar>
        <img class="profile-banner" src="../assets/Food.svg" />
      </template>
    </q-banner>
    <div class="user-info">
      <q-avatar class="user-avatar" color="accent" text-color="white">{{
        firstLetter
      }}</q-avatar>
      <div class="user-info-details user-mail">{{ userEmail }}</div>
    </div>
    <div class="menu-options">
      <div class="icon-text" @click="handleSettings()">
        <q-icon class="fas fa-cog icons" color="primary" />
        <div class="panel-text">Settings</div>
      </div>
      <q-separator color="secondary" />
      <div class="icon-text">
        <q-icon class="fa-solid fa-ban icons" color="primary" />
        <div class="panel-text">Remove Ads</div>
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
        <div class="panel-text">
          <a
            class="landing-page"
            href="https://mafteidenisa17.wixsite.com/smartmeal"
            target="_blank"
            >About the application</a
          >
        </div>
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
  data() {
    return { userEmail: "", firstLetter: "" };
  },
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
      firebaseConfig.projectAuth
        .signOut()
        .then(() => {
          this.$router.push("/Login");
        })
        .catch((error) => {});
    },
    handleSettings() {
      // this.$router.push("/settings");
    },
  },
  mounted() {
    this.userEmail = firebaseConfig.projectAuth.currentUser.email;
    this.firstLetter = this.userEmail.charAt(0).toUpperCase();
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
  margin-top: 4vh;
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
.landing-page {
  text-decoration: none;
  color: #000;
}
@media only screen and (min-width: 768px) {
  .user-info-details {
    font-size: 100%;
  }
  .icons {
    font-size: 100%;
  }
  .menu-options {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
    margin: 0;
  }
  .icon-text {
    margin-left: 1vw;
  }
}
</style>
<style lang="scss">
.avatar-banner {
  .q-banner__avatar {
    width: 100% !important;
  }
}
</style>
