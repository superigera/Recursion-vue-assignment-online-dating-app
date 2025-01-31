<template>
    <div>
        <HomeButton />
        <v-container>
            <v-card class="pa-4 chat-container">
                <v-container class="messages-wrapper">
                    <v-row v-for="msg in messages" :key="msg.id">
                        <!-- 受信メッセージ -->
                        <v-row justify="start" class="ma-16 mb-0">
                            <v-avatar size="128">
                                <img :src="user?.picture.large" alt="受信者アバター" />
                            </v-avatar>
                            <div class="message-bubble left">
                                <p>{{ returnMessage }}</p>
                                {{ msg.time }}
                            </div>
                        </v-row>

                        <!-- 送信メッセージ -->
                        <v-row justify="end" class="ma-16">
                            <div class="message-bubble right">
                                <p>{{ msg.message }}</p>
                                {{ msg.time }}
                            </div>
                        </v-row>
                    </v-row>
                </v-container>

                <div class="input-container">
                    <input v-model="newMessage" placeholder="メッセージを入力" class="message-input" />
                    <v-btn @click="sendNewMessage" color="blue-accent-1" :disabled="isMessageTooLong"> 送信 </v-btn>
                </div>
                <p class=" error-message" v-if="isMessageTooLong">
                    {{ newMessage.length }}/{{ maxMessageLength }} 文字を超えています！
                </p>
            </v-card>
        </v-container>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { useMessagesStore } from '@/stores/messagesStore';
import { ref, onMounted, nextTick, computed } from "vue";
import HomeButton from '@/components/button/HomeButton.vue';
import type { Message } from '@/types/Message';

const route = useRoute();
// @ts-ignore
const userId = route.params.id;

const userStore = useUserStore();
const user = userStore.users.find((user) => user.login.uuid === userId);

const messagesStore = useMessagesStore();

const newMessage = ref("");
const maxMessageLength = 150;

let messages = ref<Message[]>([]);
messages.value = messagesStore.getMessagesById(userId);

const returnMessage = "hello";

/**
 * メッセージが最大文字数を超えているかを判定
 * @returns {boolean} `true` の場合は制限を超えている
 */
const isMessageTooLong = computed(() => newMessage.value.length > maxMessageLength);

/**
 * メッセージを送信する
 */
function sendNewMessage() {
    if (newMessage.value === "") {
        return;
    }
    messagesStore.setMessages(userId, newMessage.value);
    messages.value = messagesStore.getMessagesById(userId);
    console.log(messages.value);
    newMessage.value = "";

    scrollToBottom();
}

/**
 * メッセージエリアを一番下にスクロールする
 */
const scrollToBottom = () => {
    nextTick(() => {
        const container = document.querySelector(".messages-wrapper");
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    });
};

/**
 * 初回レンダリング時にメッセージエリアを一番下にスクロールする
 */
onMounted(() => {
    scrollToBottom();
});
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
}

.messages-wrapper {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
}

.message-bubble {
    max-width: 60%;
    padding: 12px 16px;
    border-radius: 16px;
    font-size: 16px;
    word-break: break-word;
    color: white;
    flex-grow: 0;
}

.message-bubble.left {
    background-color: gray;
    align-self: flex-start;
    border-top-left-radius: 0;
    margin-top: 100px;
}

.message-bubble.right {
    background-color: green;
    align-self: flex-end;
    border-top-right-radius: 0;
}

.input-container {
    display: flex;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid #ccc;
    position: sticky;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
}

.message-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
}

.v-btn {
    margin-left: 10px;
    white-space: nowrap;
}
</style>