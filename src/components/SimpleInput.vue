<template>
  <q-input
    lazy-rules
    :rules="[
      (val) =>
        (val &&
          val.length > 0 &&
          val.match(
            /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
          )) ||
        'You must enter a valid email',
    ]"
    class="ad-info"
    v-model="email"
    label="Email"
  />
</template>
<script>
export default {
  data() {
    return {
      email: "",
    };
  },
};
</script>
