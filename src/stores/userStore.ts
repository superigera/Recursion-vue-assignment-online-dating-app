import { defineStore } from "pinia";
import type { User } from "@/types/User.ts";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [] as User[],
    loading: false,
  }),

  actions: {
    // ユーザー情報を取得する
    fetchUsers() {
      this.loading = true;

      axios
        .get("https://randomuser.me/api/?results=30")
        .then((response) => {
          this.users = response.data.results;
        })
        .catch((err: unknown) => {
          if (axios.isAxiosError(err)) {
            // AxiosErrorの場合
            console.error(err.response?.data);
          } else {
            // その他のエラーの場合
            console.error(err);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
