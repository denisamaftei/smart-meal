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
@font-face {
  font-family: customFont;
  src: url("./fonts/cardo-v19-latin-regular.woff");
}

#q-app {
  font-family: customFont, "Times New Roman", Times, serif;
}
.products-container {
  .q-btn__content {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
