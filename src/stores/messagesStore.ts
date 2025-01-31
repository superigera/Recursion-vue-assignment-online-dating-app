import { defineStore } from "pinia";
import type { Message } from "../types/Message";

export const useMessagesStore = defineStore("messagesStore", {
  state: () => ({
    messages: [] as Message[],
    loading: false,
  }),

  actions: {
    /**
     * 指定されたユーザー ID に紐づくメッセージ一覧を取得する
     * @param {string} userId - 取得したいユーザーの ID
     * @returns {Message[]} 指定されたユーザーのメッセージリスト
     */
    getMessagesById(userId: string): Message[] {
      return this.messages.filter((message) => message.id === userId);
    },

    /**
     * 新しいメッセージを追加する
     * @param {string} userId - メッセージを送信するユーザーの ID
     * @param {string} text - 送信するメッセージの内容
     * @returns {void}
     */
    setMessages(userId: string, text: string): void {
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
