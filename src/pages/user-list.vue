<template>
  <div>
    <h1>User List</h1>

    <p v-if="loading">Loading...</p>

    <!-- ユーザー一覧 -->
    <ul v-else>
      <v-container>
        <v-row>
          <v-col v-for="user in users" :key="user.login.uuid" cols="12" sm="6" md="4" lg="3">
            <UserItem :user="user" />
          </v-col>
        </v-row>
      </v-container>
    </ul>

  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import UserItem from '@/components/UserItem.vue';

const userStore = useUserStore();
const { users, loading } = storeToRefs(userStore);

// コンポーネントがマウントされたときにユーザーを取得
onMounted(() => {
  userStore.fetchUsers();
});
</script>