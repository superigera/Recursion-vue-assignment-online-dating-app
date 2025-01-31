import { defineStore } from "pinia";
import type { Message } from "../types/Message";

export const useMessagesStore = defineStore("messagesStore", {
  state: () => ({
    messages: [] as Message[],
    loading: false,
  }),

  actions: {
    // メッセージ一覧を取得する
    getMessagesById(userId: string): Message[] {
      // idが合致するメッセージを取得する
      return this.messages.filter((message) => message.id === userId);
    },

    setMessages(userId: string, text: string): void {
      // 送信されたメッセージを追加する
      const date = new Date();
      this.messages.push({
        id: userId,
        message: text,
        time: `${date.getFullYear()}年${
          date.getMonth() + 1
        }月${date.getDate()}日${date.getHours()}:${String(
          date.getMinutes()
        ).padStart(2, "0")}`,
      });
    },
  },
});
