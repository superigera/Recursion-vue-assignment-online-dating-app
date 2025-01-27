import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [] as {
      name: { first: string; last: string };
      dob: { date: string; age: number };
      picture: { large: string };
      login: { uuid: string };
      gender: { gender: string };
      location: { country: string; state: string; city: string };
      email: { email: string };
    }[],
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
