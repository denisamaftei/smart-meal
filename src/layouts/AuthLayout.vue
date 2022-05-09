<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <img src="../assets/BigLogo.svg" />
        </div>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: "AuthLayout",
};
</script>

<style scoped>
.q-header {
  background-color: #fff;
}
.q-gutter-md {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
