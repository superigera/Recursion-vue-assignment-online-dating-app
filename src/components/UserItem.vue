<template>
  <v-card>
    <v-img :src="user.picture.large" height="200px" alt="User Picture"></v-img>
    <v-card-title>{{ user.name.first }} {{ user.name.last }}</v-card-title>
    <v-card-text>age: {{ user.dob.age }}</v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

interface User {
  name: { first: string; last: string };
  dob: { age: number };
  picture: { large: string };
  login: { uuid: string };
}

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});
</script>

<style scoped>
img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-left: 10px;
}
</style>
