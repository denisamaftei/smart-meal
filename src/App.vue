<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
<style lang="scss">
#q-app {
  font-family: "Times New Roman", Times, serif;
}
.products-container {
  .q-btn__content {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
