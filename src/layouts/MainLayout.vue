<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <img src="../assets/Logo.svg" />
        </div>
      </div>
    </q-header>
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
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

// import EssentialLink from "components/EssentialLink.vue";

// const linksList = [
//   {
//     title: "Docs",
//     caption: "quasar.dev",
//     icon: "school",
//     link: "https://quasar.dev",
//   },
//   {
//     title: "Github",
//     caption: "github.com/quasarframework",
//     icon: "code",
//     link: "https://github.com/quasarframework",
//   },
//   {
//     title: "Discord Chat Channel",
//     caption: "chat.quasar.dev",
//     icon: "chat",
//     link: "https://chat.quasar.dev",
//   },
//   {
//     title: "Forum",
//     caption: "forum.quasar.dev",
//     icon: "record_voice_over",
//     link: "https://forum.quasar.dev",
//   },
//   {
//     title: "Twitter",
//     caption: "@quasarframework",
//     icon: "rss_feed",
//     link: "https://twitter.quasar.dev",
//   },
//   {
//     title: "Facebook",
//     caption: "@QuasarFramework",
//     icon: "public",
//     link: "https://facebook.quasar.dev",
//   },
//   {
//     title: "Quasar Awesome",
//     caption: "Community Quasar projects",
//     icon: "favorite",
//     link: "https://awesome.quasar.dev",
//   },
// ];

export default defineComponent({
  name: "MainLayout",

  //   components: {
  //     EssentialLink,
  //   },

  //   setup() {
  //     const leftDrawerOpen = ref(false);

  //     return {
  //       essentialLinks: linksList,
  //       leftDrawerOpen,
  //       toggleLeftDrawer() {
  //         leftDrawerOpen.value = !leftDrawerOpen.value;
  //       },
  //     };
  //   },
  setup() {
    return {
      tab: ref("mails"),
    };
  },
});
</script>
<style>
.q-header {
  background-color: #fff;
  /* box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%); */
}
.q-tab__icon {
  color: #f99e77;
  font-size: 2.7em;
}
.q-tabs {
  height: 8vh;
}
.add .q-tab__icon {
  font-size: 4em;
}
.q-tab--active .q-tab__indicator {
  background-color: #f99e77;
}
.q-pa-md {
  padding-bottom: 5px;
}
</style>
