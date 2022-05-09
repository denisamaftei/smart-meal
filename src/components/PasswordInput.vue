<template>
  <q-input
    class="password-input"
    v-model="password"
    :type="isPwd ? 'password' : 'text'"
    label="Password"
  >
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
</template>
<script>
export default {
  data() {
    return {
      password: "",
      isPwd: true,
      loading1: false,
    };
  },
};
</script>
<style scoped>
.password-input .q-icon {
  color: #f99e77;
}
</style>
