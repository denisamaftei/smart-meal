<template>
  <q-page-container>
    <div
      class="q-gutter-sm row justify-center items-center content-center profile-page"
    >
      <q-layout view="lHh Lpr lFf">
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
          <div class="user-info-details user-phone">+407362536643</div>
        </div>
        <div class="user-panel">
          <div class="icon-text">
            <q-icon class="fas fa-cog icons" name="settings" color="primary" />
            <div class="panel-text">Settings</div>
          </div>
          <q-separator color="secondary" />
          <div class="icon-text">
            <q-icon
              class="fas fa-question icons"
              name="question_mark"
              color="primary"
            />
            <div class="panel-text">Help</div>
          </div>
          <q-separator color="secondary" />
          <div class="icon-text">
            <q-icon class="fas fa-lock icons" name="lock" color="primary" />
            <div class="panel-text">Terms of Services</div>
          </div>
          <q-separator color="secondary" />
          <div class="icon-text">
            <q-icon
              class="fas fa-user-secret icons"
              name="feed"
              color="primary"
            />
            <div class="panel-text">Privacy Policy</div>
          </div>
          <q-separator color="secondary" />
          <div class="icon-text">
            <q-icon class="fas fa-info icons" name="info" color="primary" />
            <div class="panel-text">About the application</div>
          </div>
          <q-separator color="secondary" />
          <div class="icon-text log-out" @click="logout()">
            <q-icon
              class="fas fa-sign-out-alt icons"
              name="logout"
              color="primary"
            />
            <div class="panel-text">Sign out</div>
          </div>
        </div>
        <q-footer elevated>
          <q-tabs v-model="tab">
            <q-route-tab to="/" name="home" icon="kitchen" />
            <q-route-tab to="/expiringSoon" name="expiring" icon="warning" />
            <q-route-tab
              to="/newProduct"
              class="add"
              name="add"
              icon="add_circle"
            />
            <q-route-tab to="/recipes" name="recipes" icon="receipt" />
            <q-route-tab to="/profile" name="profile" icon="person" />
          </q-tabs>
        </q-footer>
      </q-layout>
    </div>
  </q-page-container>
</template>
<script>
// import AdContainer from 'components/AdContainer.vue'
import { useRecipesStore } from "../stores/recipesStore";
import { ref, watchEffect } from "vue";
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
    const recipesStore = useRecipesStore();

    return { getRecipesCategories: recipesStore.getRecipesCategories };
  },
  components: {
    // AdContainer,
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
  data() {
    return {
      tab: "mails",
      recipesCategories: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.q-page-container {
  padding-top: 0 !important;
}
.profile-banner {
  opacity: 0.15;
  object-fit: cover;
  max-height: 30vh;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
}
.user-avatar {
  /* height: 2em;
  width: 2em; */
}
.icons,
.panel-text {
  display: inline;
}
.user-panel {
  display: flex;
  flex-direction: column;
  margin: 15% 12% 0% 12%;
}
.icons {
  // padding-top: 0.2vh;
  margin-right: 2vw;
  font-size: 7vw;
}
.panel-text {
  font-size: 5vw;
}
.icon-text {
  display: flex;
  flex-direction: row;
  margin-top: 2vh;
  margin-bottom: 2vh;
}
.q-separator--horizontal-item-inset {
  margin-left: 0;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 5%;
  width: 100%;
}
.user-info-details {
  margin-top: 1vh;
  font-size: 5vw;
}
.user-name {
  font-weight: 900;
  font-family: Cardo-Bold, Arial, Helvetica, sans-serif;
}
.profile-page {
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
}
.q-banner {
  background: #9dd0e7;
  margin: 0;
  padding: 0;
  opacity: 0.7;
  height: 30vh;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.q-header {
  display: none;
}
</style>
<style lang="scss">
.q-banner__avatar {
  width: 100% !important;
}
</style>
