<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add icons to the library */
library.add(faUserSecret);

/* add font awesome icon component */
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
