<template>
  <q-input
    lazy-rules
    :rules="[
      (val) => (val && val.length > 0) || 'You must enter a valid email',
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
